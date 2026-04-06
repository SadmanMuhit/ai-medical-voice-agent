import {
  integer,
  pgTable,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

/* ================= USERS ================= */

export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  name: varchar("name", { length: 255 }).notNull(),

  email: varchar("email", { length: 255 })
    .notNull()
    .unique(),

  credits: integer("credits").default(0),
});

/* ================= SESSION ================= */

export const SessionChatTable = pgTable("session_chat", {
  sessionId: varchar("session_id", { length: 255 }).primaryKey(),

  notes: text("notes"),

  selectedDoctor: varchar("selected_doctor", { length: 255 }),

  createdBy: varchar("created_by", { length: 255 }),

  createdOn: timestamp("created_on").defaultNow(),
});