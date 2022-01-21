"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  // add awesomefont icon to act as button above a href
  //TODO: Ask about div vs just throwing the font awesome
  return $(`
      <li id="${story.storyId}">
        <i class="far fa-star"></i>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}


/**Function to be called upon submitting new story form, creates
 * story and POSTs to backend. Then updates stories-container.
 */
async function createAndAddNewStory(evt) {
  evt.preventDefault();
  const newStory = {
    title: $("#new-story-title").val(),
    url: $("#new-story-url").val(),
    author: $("#new-story-author").val(),
  };
  console.log("newstory object & currentUser obj:", newStory, currentUser);

  $newStoryForm.hide();
  const newStoryInstance = await storyList.addStory(currentUser, newStory);
  const formattedStory = generateStoryMarkup(newStoryInstance);
  $allStoriesList.prepend(formattedStory);
  $allStoriesList.show();
}

$newStoryForm.on('submit', createAndAddNewStory);

/** Empties the favoriteStories list, then adds
 * currentUser's favorites to DOM, redisplays.
 */
function putFavoritesOnPage() {
  console.debug("putFavoritesOnPage");

  $allFavoriteStories.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of currentUser.favorites) {
    const $story = generateStoryMarkup(story);
    $allFavoriteStories.append($story);
  }

  $allFavoriteStories.show();
}

/** Toggle favorite -- when user clicks on fav star:
 *  if favorited, becomes unfavorited, and vice versa */

async function toggleFavorite(evt){
  const $starClicked = $(evt.target);
  const storyId = $starClicked.closest("li").attr("id");
  
  
  const targetStory = storyList.stories.find( s =>
    s.storyId === storyId
  );
  const storyFavStatus = 
    currentUser.favorites.includes(targetStory) ? true : false;
  if (storyFavStatus) {
    $starClicked.toggleClass("fas far");
    currentUser.unFavoriteStory(targetStory);
    return;
  } else {
    $starClicked.toggleClass("far fas");
    currentUser.favoriteStory(targetStory);
    return;
  }
}

$storiesContainer.on("click", ".fa-star", toggleFavorite);