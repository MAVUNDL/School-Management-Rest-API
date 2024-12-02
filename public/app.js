const apiUrl = 'http://localhost:3000/api/v1/schools';  // Your API endpoint
const schoolsTable = document.querySelector('#schoolsTable tbody');
const paginationDiv = document.querySelector('#paginationDiv');
const addSchoolForm = document.querySelector('#addSchoolForm');
let schools = [];
let currentPage = 0;
const rowsPerPage = 10;
const maxPageButtons = 10;  // Number of page buttons to display at a time

// Fetch and display all schools
async function fetchSchools() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch schools');
        schools = await response.json();
        displayTable(currentPage);
        setupPagination();
    } catch (error) {
        console.error(error);
        alert('Error fetching schools');
    }
}

// Display table with pagination
function displayTable(page) {
    schoolsTable.innerHTML = '';  // Clear the table before inserting new rows
    const start = page * rowsPerPage;  // Determine the starting index of the data to be displayed
    const end = start + rowsPerPage;   // Determine the end index
    const pageSchools = schools.slice(start, end);  // Get a slice of schools for the current page

    pageSchools.forEach(school => {
        const row = schoolsTable.insertRow();
        row.innerHTML = `
            <td>${school.natemis}</td>
            <td>${school.institution_name}</td>
            <td>${school.educator_number_2017}</td>
            <td>${school.learner_number_2017}</td>
        `;
    });
}

// Setup pagination buttons with scrolling
function setupPagination() {
    paginationDiv.innerHTML = '';  // Clear previous pagination buttons
    const totalPages = Math.ceil(schools.length / rowsPerPage);  // Calculate total pages

    const prevButton = document.createElement('button');
    prevButton.textContent = 'Prev';
    prevButton.disabled = currentPage === 0;  // Disable the 'Prev' button if on the first page
    prevButton.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            displayTable(currentPage);  // Reload the table with the new page
            setupPagination();  // Re-setup pagination buttons
        }
    });
    paginationDiv.appendChild(prevButton);

    // Calculate the start and end page for displaying a limited number of page buttons (maxPageButtons)
    const startPage = Math.floor(currentPage / maxPageButtons) * maxPageButtons;
    const endPage = Math.min(startPage + maxPageButtons, totalPages);

    for (let i = startPage; i < endPage; i++) {
        const button = document.createElement('button');
        button.textContent = i + 1;
        button.classList.toggle('active', i === currentPage);  // Highlight the current page
        button.addEventListener('click', () => {
            currentPage = i;
            displayTable(currentPage);  // Reload the table with the selected page
            setupPagination();  // Re-setup pagination buttons
        });
        paginationDiv.appendChild(button);
    }

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.disabled = currentPage === totalPages - 1;  // Disable the 'Next' button if on the last page
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages - 1) {
            currentPage++;
            displayTable(currentPage);  // Reload the table with the new page
            setupPagination();  // Re-setup pagination buttons
        }
    });
    paginationDiv.appendChild(nextButton);
}

addSchoolForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        natemis: document.querySelector('#natemis').value,
        institution_name: document.querySelector('#institution_name').value,
        status: document.querySelector('#status').value,
        sector: document.querySelector('#sector').value,
        type_doe: document.querySelector('#type_doe').value,
        phase: document.querySelector('#phase').value,
        specialization: document.querySelector('#specialization').value,
        ownerland: document.querySelector('#ownerland').value,
        ownerbuild: document.querySelector('#ownerbuild').value,
        ownership: document.querySelector('#ownership').value,
        magisterial_district: document.querySelector('#magisterial_district').value,
        dmunname: document.querySelector('#dmunname').value,
        township_village: document.querySelector('#township_village').value,
        suburb: document.querySelector('#suburb').value,
        town_city: document.querySelector('#town_city').value,
        streetaddress: document.querySelector('#streetaddress').value,
        postaladdress: document.querySelector('#postaladdress').value,
        telephone: document.querySelector('#telephone').value,
        facsimile: document.querySelector('#facsimile').value,
        registrationdate: document.querySelector('#registrationdate').value,
        educator_number_2017: document.querySelector('#educator_number_2017').value || null,
        learner_number_2017: document.querySelector('#learner_number_2017').value || null,
    };

    try {
        const response = await fetch('http://localhost:3000/api/v1/schools/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('School successfully added!');
            fetchSchools(); // Refresh the schools list
        } else {
            const error = await response.text();
            alert(`Failed to add school: ${error}`);
        }
    } catch (error) {
        console.error('Error adding school:', error);
        alert('Error adding school');
    }
});


// Handle searching for a school by EMIS number
document.querySelector('#searchButton').addEventListener('click', async () => {
    const natemis = document.querySelector('#emisSearch').value;
    
    if (!natemis) {
        alert("Please enter an EMIS number");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/${natemis}`);
        if (!response.ok) {
            alert('School not found');
            return;
        }
        const schoolArray = await response.json();

        if (schoolArray.length > 0) {
            const school = schoolArray[0];  // Extract the first school object
            schoolsTable.innerHTML = '';  // Clear the table before displaying the searched school

            const row = schoolsTable.insertRow();
            row.innerHTML = `
                <td>${school.natemis}</td>
                <td>${school.institution_name}</td>
                <td>${school.educator_number_2017 || 'N/A'}</td>
                <td>${school.learner_number_2017 || 'N/A'}</td>
            `;
        } else {
            alert('No school found for the given EMIS number');
        }

    } catch (error) {
        console.error(error);
        alert('Error searching school');
    }
});

// Update the number of teachers
async function updateTeachers(event) {
    event.preventDefault();
    const emisNumber = document.getElementById("teacherEmis").value;
    const newTeacherCount = document.getElementById("newTeacherCount").value;

    try {
        const response = await fetch(`${apiUrl}/teachers/${emisNumber}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ educator_number_2017: parseInt(newTeacherCount) })
        });

        if (response.ok) {
            alert(await response.text());
            await fetchSchools();  // Refresh the table
        } else {
            alert("Failed to update number of teachers.");
        }
    } catch (error) {
        console.error(error);
        alert("An error occurred while updating teachers.");
    }
}

// Update the number of learners
async function updateLearners(event) {
    event.preventDefault();
    const emisNumber = document.getElementById("learnerEmis").value;
    const newLearnerCount = document.getElementById("newLearnerCount").value;

    try {
        const response = await fetch(`${apiUrl}/learners/${emisNumber}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ learner_number_2017: parseInt(newLearnerCount) })
        });

        if (response.ok) {
            alert(await response.text());
            await fetchSchools();  // Refresh the table
        } else {
            alert("Failed to update number of learners.");
        }
    } catch (error) {
        console.error(error);
        alert("An error occurred while updating learners.");
    }
}

// Initialize page with data
fetchSchools();
