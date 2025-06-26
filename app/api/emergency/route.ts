import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Fetch all emergency requests (for nurse dashboard)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    // Use raw SQL query as fallback while Prisma client regenerates
    let query = `SELECT * FROM EmergencyRequest`;
    let params: any[] = [];
    
    if (status && status !== 'ALL') {
      query += ` WHERE status = ?`;
      params.push(status);
    }
    
    query += ` ORDER BY createdAt DESC`;
    
    const emergencyRequests = await prisma.$queryRawUnsafe(query, ...params);

    return NextResponse.json({
      success: true,
      emergencyRequests,
      count: Array.isArray(emergencyRequests) ? emergencyRequests.length : 0
    });
  } catch (error) {
    console.error('Error fetching emergency requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch emergency requests' },
      { status: 500 }
    );
  }
}

// POST: Create a new emergency request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      patientName,
      patientPhone,
      patientLocation,
      emergencyType,
      description,
      priorityLevel = 'EMERGENCY'
    } = body;

    // Validate required fields
    if (!patientName || !patientPhone || !patientLocation || !emergencyType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate a simple ID
    const id = 'emergency_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    const now = new Date().toISOString();

    // Use raw SQL insert
    await prisma.$executeRawUnsafe(`
      INSERT INTO EmergencyRequest (
        id, patientName, patientPhone, patientLocation, emergencyType, 
        description, priorityLevel, status, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, id, patientName, patientPhone, patientLocation, emergencyType, 
       description || null, priorityLevel, 'PENDING', now, now);

    const emergencyRequest = {
      id,
      patientName,
      patientPhone,
      patientLocation,
      emergencyType,
      description,
      priorityLevel,
      status: 'PENDING',
      createdAt: now,
      updatedAt: now
    };

    console.log('New emergency request created:', emergencyRequest);

    return NextResponse.json({
      success: true,
      emergencyRequest,
      message: 'Emergency request submitted successfully'
    });
  } catch (error) {
    console.error('Error creating emergency request:', error);
    return NextResponse.json(
      { error: 'Failed to create emergency request' },
      { status: 500 }
    );
  }
}

// PUT: Update emergency request status (acknowledge, dispatch, resolve)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, acknowledgedBy } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    let query = `UPDATE EmergencyRequest SET status = ?, updatedAt = ?`;
    let params = [status, now];

    // Set acknowledgment or resolution timestamps
    if (status === 'ACKNOWLEDGED' && acknowledgedBy) {
      query += `, acknowledgedBy = ?, acknowledgedAt = ?`;
      params.push(acknowledgedBy, now);
    } else if (status === 'RESOLVED') {
      query += `, resolvedAt = ?`;
      params.push(now);
    }

    query += ` WHERE id = ?`;
    params.push(id);

    await prisma.$executeRawUnsafe(query, ...params);

    // Fetch the updated record
    const updatedRequest = await prisma.$queryRawUnsafe(
      `SELECT * FROM EmergencyRequest WHERE id = ?`, id
    );

    return NextResponse.json({
      success: true,
      emergencyRequest: Array.isArray(updatedRequest) ? updatedRequest[0] : updatedRequest,
      message: `Emergency request ${status.toLowerCase()}`
    });
  } catch (error) {
    console.error('Error updating emergency request:', error);
    return NextResponse.json(
      { error: 'Failed to update emergency request' },
      { status: 500 }
    );
  }
}
