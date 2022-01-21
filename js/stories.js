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
  return $(`
      <li id="${story.storyId}">
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
 * story and adds to backend. Then repopulates stories-container.
 */


//TODO: replace getAndShow call -- assign return from addStory to variable,
// pass to generate story markup, prepend to the DOM
async function createAndAddNewStory(evt) {
  evt.preventDefault();
  const newStory = {
    title: $("#new-story-title").val(),
    url: $("#new-story-url").val(),
    author: $("#new-story-author").val(),
  };
  console.log("newstory object & currentUser obj:", newStory, currentUser);

  $newStoryForm.hide();
  await storyList.addStory(currentUser, newStory);
  await getAndShowStoriesOnStart();
}

$newStoryForm.on('submit', createAndAddNewStory);