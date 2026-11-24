export async function onRequestGet(context) {
  try {
    await context.env.DB.prepare("SELECT 1").first();
    return new Response("Connexion D1 OK");
  } catch (error) {
    return new Response("Erreur de connexion", {
      status: 500
    });
  }
}
