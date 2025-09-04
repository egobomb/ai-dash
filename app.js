// Default occupations with icons and colors
const DEFAULT_OCCUPATIONS = [
  { id: 'dermatologist', title: 'Dermatologist', emoji: '🧑‍⚕️', color: '#10b981', agentUrl: '' },
  { id: 'fitness-coach', title: 'Fitness Coach', emoji: '💪', color: '#f59e0b', agentUrl: '' },
  { id: 'software-dev', title: 'Software Developer', emoji: '💻', color: '#3b82f6', agentUrl: '' },
  { id: 'chef', title: 'Chef', emoji: '👨‍🍳', color: '#ef4444', agentUrl: '' },
  { id: 'teacher', title: 'Teacher', emoji: '👩‍🏫', color: '#8b5cf6', agentUrl: '' },
  { id: 'lawyer', title: 'Lawyer', emoji: '⚖️', color: '#6b7280', agentUrl: '' }
];

// Storage keys
const STORAGE_KEY = 'occupations-dashboard';
const NOTES_KEY = 'occupation-notes';

// DOM elements
const grid = document.getElementById('grid');
const dialog = document.getElementById('occupationDialog');
const form = document.getElementById('occupationForm');
const customizeBtn = document.getElementById('customizeBtn');
const fabAdd = document.getElementById('fabAdd');
const existingList = document.getElementById('existingList');
const deleteBtn = document.getElementById('deleteBtn');
const cancelBtn = document.getElementById('cancelBtn');

// State
let occupations = [];
let editingId = null;

// Initialize app
function init() {
  loadOccupations();
  renderGrid();
  setupEventListeners();
}

// Load occupations from localStorage or use defaults
function loadOccupations() {
  const stored = localStorage.getItem(STORAGE_KEY);
  occupations = stored ? JSON.parse(stored) : DEFAULT_OCCUPATIONS;
}

// Save occupations to localStorage
function saveOccupations() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(occupations));
}

// Render the occupations grid
function renderGrid() {
  grid.innerHTML = '';
  
  if (occupations.length === 0) {
    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--muted); padding: 40px;">No occupations yet. Add one to get started!</p>';
    return;
  }
  
  occupations.forEach(occ => {
    const card = document.createElement('div');
    card.className = 'card';
    
    card.innerHTML = `
      <div class="icon" style="background-color: ${occ.color}">${occ.emoji}</div>
      <div class="card-content">
        <div class="title">${occ.title}</div>
        <div class="subtitle">AI Agent</div>
      </div>
      <button class="card-edit-btn" title="Edit occupation" aria-label="Edit occupation">✏️</button>
    `;
    
    // Main card click opens agent
    card.onclick = (e) => {
      if (!e.target.classList.contains('card-edit-btn')) {
        openAgent(occ);
      }
    };
    
    // Edit button click opens edit dialog
    const editBtn = card.querySelector('.card-edit-btn');
    editBtn.onclick = (e) => {
      e.stopPropagation();
      showDialog(occ);
    };
    
    grid.appendChild(card);
  });
}

// Open agent page for an occupation
function openAgent(occupation) {
  const params = new URLSearchParams({
    id: occupation.id,
    title: occupation.title,
    emoji: occupation.emoji,
    color: occupation.color,
    agentUrl: occupation.agentUrl || ''
  });
  
  window.location.href = `agent.html?${params.toString()}`;
}

// Show dialog for adding/editing occupation
function showDialog(occupation = null) {
  editingId = occupation?.id || null;
  
  document.getElementById('dialogTitle').textContent = occupation ? 'Edit occupation' : 'Add occupation';
  document.getElementById('occTitle').value = occupation?.title || '';
  document.getElementById('occEmoji').value = occupation?.emoji || '';
  document.getElementById('occColor').value = occupation?.color || '#3b82f6';
  document.getElementById('occAgentUrl').value = occupation?.agentUrl || '';
  document.getElementById('occId').value = occupation?.id || '';
  
  deleteBtn.hidden = !occupation;
  
  renderExistingList();
  dialog.showModal();
}

// Render existing occupations list in dialog
function renderExistingList() {
  existingList.innerHTML = '';
  
  occupations.forEach(occ => {
    const li = document.createElement('li');
    li.className = 'list-item';
    li.onclick = () => {
      const occupation = occupations.find(o => o.id === occ.id);
      showDialog(occupation);
    };
    
    li.innerHTML = `
      <div class="dot" style="background-color: ${occ.color}"></div>
      <span class="name">${occ.emoji} ${occ.title}</span>
    `;
    
    existingList.appendChild(li);
  });
}

// Handle form submission
function handleSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(form);
  const title = formData.get('title').trim();
  const emoji = formData.get('emoji').trim();
  const color = formData.get('color');
  const agentUrl = formData.get('agentUrl').trim();
  
  if (!title) return;
  
  const occupation = {
    id: editingId || generateId(title),
    title,
    emoji: emoji || '💼',
    color,
    agentUrl
  };
  
  if (editingId) {
    const index = occupations.findIndex(o => o.id === editingId);
    if (index !== -1) {
      occupations[index] = occupation;
    }
  } else {
    occupations.push(occupation);
  }
  
  saveOccupations();
  renderGrid();
  dialog.close();
}

// Delete occupation
function deleteOccupation() {
  if (!editingId) return;
  
  if (confirm('Delete this occupation? This will also remove any saved notes.')) {
    occupations = occupations.filter(o => o.id !== editingId);
    localStorage.removeItem(`${NOTES_KEY}-${editingId}`);
    saveOccupations();
    renderGrid();
    dialog.close();
  }
}

// Generate ID from title
function generateId(title) {
  return title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

// Setup event listeners
function setupEventListeners() {
  customizeBtn.onclick = () => showDialog();
  fabAdd.onclick = () => showDialog();
  form.onsubmit = handleSubmit;
  deleteBtn.onclick = deleteOccupation;
  cancelBtn.onclick = () => dialog.close();
  
  // Close dialog on backdrop click
  dialog.onclick = (e) => {
    if (e.target === dialog) dialog.close();
  };
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
