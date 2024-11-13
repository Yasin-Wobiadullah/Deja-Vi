let startTime = Date.now();  // Start time for time tracking

// Function to calculate the time spent
function getTimeSpent() {
  return Math.floor((Date.now() - startTime) / 1000); // Time in seconds
}

// Function to send page data (URL and title)
function sendPageData() {
  const pageText = document.body.innerText;
  const pageTitle = document.title;
  const pageUrl = window.location.href;

  fetch('http://localhost:3000/api/chrome-extension/new-tab', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: pageText,  // Optional for now
      url: pageUrl,    // Required
      title: pageTitle // Required
    }),
  })
  .then(response => response.json())
  .then(data => console.log('Page data sent:', data))
  .catch(error => console.error('Error sending page data:', error));
}

// Function to send time data on relevant events
function sendTimeData() {
  const timeSpent = getTimeSpent();
  const pageTitle = document.title;
  const pageUrl = window.location.href;

  fetch('http://localhost:3000/api/chrome-extension/track-time', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url: pageUrl,
      title: pageTitle,
      timeSpent: timeSpent
    }),
  })
  .then(response => response.json())
  .then(data => console.log('Time data sent:', data))
  .catch(error => console.error('Error sending time data:', error));

  startTime = Date.now(); // Reset start time after sending
}

// Trigger page data sending on initial load
sendPageData();

// Trigger time data sending on tab visibility change
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    sendTimeData();
  }
});

// Trigger time data sending before the page unloads
window.addEventListener('beforeunload', sendTimeData);
