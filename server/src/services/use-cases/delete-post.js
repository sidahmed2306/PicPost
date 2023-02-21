// Importiere das Post-Modell
const { Post } = require("../../models");

// Funktion zum Löschen eines Posts
async function deletePost(postId) {
  console.log("delete", postId);
  try {
    // Suche den Post mit der gegebenen ID in der Datenbank
    const post = await Post.findById(postId);

    // Überprüfe, ob der Post gefunden wurde
    if (!post) {
      throw new Error("Post not found");
    }

    // Lösche den Post aus der Datenbank
    await post.remove();

    // Gebe eine Bestätigung zurück, dass der Post gelöscht wurde
    return { message: "Post deleted successfully" };
  } catch (error) {
    // Falls ein Fehler auftritt, gebe eine Fehlermeldung zurück
    return { error: error.message };
  }
}

module.exports = {
  deletePost,
};
