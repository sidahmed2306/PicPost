const { Post } = require("../../models");

// Funktion zum Aktualisieren der Post-Caption
async function updatePostCaption(postId, newCaption) {
  try {
    console.log("usecase", postId, newCaption);
    // Suche den Post mit der gegebenen ID in der Datenbank
    const post = await Post.findById(postId);

    // Überprüfe, ob der Post gefunden wurde
    if (!post) {
      throw new Error("Post not found");
    }

    // Aktualisiere die Caption des Posts mit der neuen Caption
    post.caption = newCaption;

    // Speichere die Aktualisierung in der Datenbank
    await post.save();

    // Gebe eine Bestätigung zurück, dass die Aktualisierung erfolgreich war
    return { message: "Post caption updated successfully" };
  } catch (error) {
    // Falls ein Fehler auftritt, gebe eine Fehlermeldung zurück
    return { error: error.message };
  }
}
module.exports = {
  updatePostCaption,
};
