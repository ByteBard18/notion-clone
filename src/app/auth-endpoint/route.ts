import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "../../../firebase-admin";

export const POST = async (req: NextRequest) => {
  // Step 1: Protect the route with Clerk authentication
  const { sessionClaims } = await auth();

  // Step 2: Check if sessionClaims is valid and contains the necessary properties
  if (!sessionClaims || !sessionClaims.email || !sessionClaims.fullname || !sessionClaims.image) {
    return NextResponse.json(
      { message: "Missing required session information" },
      { status: 400 }
    );
  }

  // Step 3: Get the room ID from the request body
  const { room } = await req.json();

  // Step 4: Prepare the Liveblocks session using session claims
  const session = liveblocks.prepareSession(sessionClaims.email, {
    userInfo: {
      name: sessionClaims.fullname,
      email: sessionClaims.email,
      avatar: sessionClaims.image,
    },
  });

  // Step 5: Query the database to find the user in the specified room
  const usersInRoom = await adminDb
    .collectionGroup("rooms")
    .where("userId", "==", sessionClaims.email)
    .get();

  // Step 6: Find the room from the fetched user data
  const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

  // Step 7: If the user is not in the room, return a 403 response
  if (!userInRoom?.exists) {
    return NextResponse.json(
      { message: "You are not in this room" },
      { status: 403 }
    );
  }

  // Step 8: Allow full access to the room if user is valid
  session.allow(room, session.FULL_ACCESS);
  
  // Step 9: Authorize and return the session response
  const { body, status } = await session.authorize();
  return new Response(body, { status });
};
