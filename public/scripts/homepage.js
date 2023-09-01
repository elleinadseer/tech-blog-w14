  const newPostHandler = async (event) => {
    event.preventDefault();
  
    // Get post information from selected fields
    const post_content = document.querySelector('#post-text').value.trim();
    // Remove the '#' from the chosen tag so that it matches with a tag in the database
    const tag_name = document
      .querySelector('#tag-select')
      .value.trim()
      .replace('#', '');
  
    // Check that both post_content and tag_name have a value
    if (post_content && tag_name) {
      // Send a POST request to create a new post with the provided data
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ post_content, tag_name }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // Display the homepage upon successfully making a new post
        document.location.replace('/');
      } else {
        alert('Failed to create post');
      }
    } else {
      alert("Your post is either empty or you haven't selected a tag");
    }
  };
  
  const openModals = document.querySelectorAll('.open');
  const closeModals = document.querySelectorAll('.close');
  
  // Add event listeners to each element with class 'open' to show the modal when clicked
  openModals.forEach((openModal, index) => {
    openModal.addEventListener('click', () => {
      // Retrieve the corresponding modal element based on the index of the clicked element
      const modal = document.querySelectorAll('.modal')[index];
      modal.showModal();
    });
  });
  
  // Add event listeners to each element with class 'close' to close the modal when clicked
  closeModals.forEach((closeModal, index) => {
    closeModal.addEventListener('click', () => {
      const modal = document.querySelectorAll('.modal')[index];
      modal.close();
    });
  });
  
  const newCommentHandler = async (postId) => {
    const post_id = `${postId}`;
    const comment_text = document
      .querySelector(`#cmnt-text-${postId}`)
      .value.trim();
  
    if (post_id && comment_text) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ post_id, comment_text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create comment');
      }
    }
  };
  
  function lightFunction() {
    var element = document.body;
    element.classList.toggle('light-mode');
  }
  
  // Function to hide comment posting elements if a user is not logged in
  // Necessary because conditionally rendering these elements in handlebars wouldn't work
  const updateCommentElementVisibility = () => {
    const logged_in = document.body.getAttribute('data-logged-in');
  
    // Check if the user is logged in and hide the comment input and button if not
    const commentElementsToHide = document.querySelectorAll('.comment-hidden');
    commentElementsToHide.forEach((element) => {
      if (!logged_in) {
        element.style.display = 'none';
      }
    });
  };
  
  document.addEventListener('DOMContentLoaded', updateCommentElementVisibility);
  
  document
    .querySelector('#post-button')
    .addEventListener('click', newPostHandler);

    