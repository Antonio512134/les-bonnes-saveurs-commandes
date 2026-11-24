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

export async function onRequestPost(context) {
  try {
    const data = await context.request.json();

    if (
      typeof data.nom_client !== "string" ||
      !data.nom_client.trim() ||
      typeof data.sandwich !== "string" ||
      !data.sandwich.trim() ||
      !Number.isInteger(data.quantite) ||
      data.quantite <= 0 ||
      !Number.isFinite(data.prix) ||
      data.prix <= 0
    ) {
      return Response.json(
        { success: false },
        { status: 400 }
      );
    }

    await context.env.DB.prepare(
      "INSERT INTO commandes (nom_client, sandwich, quantite, prix) VALUES (?, ?, ?, ?)"
    ).bind(
      data.nom_client,
      data.sandwich,
      data.quantite,
      data.prix
    ).run();

    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { success: false },
      { status: 500 }
    );
  }
}
