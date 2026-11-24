export async function onRequestGet(context) {
  try {
    await context.env.DB.prepare(
      "SELECT id FROM commandes LIMIT 1"
    ).first();

    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { success: false },
      { status: 500 }
    );
  }
}
