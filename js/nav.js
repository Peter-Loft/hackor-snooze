"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $newStoryForm.hide();
  $loginForm.show();
  $signupForm.show();

}

$navLogin.on("click", navLoginClick);

/**Clear the stories container, populate with add story form */

function navSubmitClick(evt) {
  console.debug("navSubmitClick", evt);
  hidePageComponents();
  $newStoryForm.show();
}

$navSubmit.on("click", navSubmitClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

/** function clears all components and displays favorites list */

function navFavoritesClick(evt) {
  console.debug("navSubmitClick", evt);
  hidePageComponents();
  putFavoritesOnPage();
}

$navFavorites.on("click", navFavoritesClick);