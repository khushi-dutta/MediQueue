-- CreateTable
CREATE TABLE "EmergencyRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patientName" TEXT NOT NULL,
    "patientPhone" TEXT NOT NULL,
    "patientLocation" TEXT NOT NULL,
    "emergencyType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "priorityLevel" TEXT NOT NULL DEFAULT 'HIGH',
    "description" TEXT,
    "acknowledgedBy" TEXT,
    "acknowledgedAt" DATETIME,
    "resolvedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
