document.addEventListener("DOMContentLoaded", () => {
    // Form and Resume elements
    const form = document.getElementById("resume-form");
    const resumeContent = document.getElementById("resume-content");
    const shareableLink = document.getElementById("shareable-link");
    const copyLinkBtn = document.getElementById("copy-link-btn");
    const downloadBtn = document.getElementById("download-btn");

    // Event listener for form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Collect user input data
        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            degree: document.getElementById("degree").value,
            school: document.getElementById("school").value,
            gradYear: parseInt(document.getElementById("gradYear").value),
            jobTitle: document.getElementById("jobTitle").value,
            company: document.getElementById("company").value,
            years: parseInt(document.getElementById("years").value),
            skills: document
                .getElementById("skills")
                .value.split(",")
                .map((skill) => skill.trim()),
        };

        // Debugging
        console.log("Form Data Collected:", formData);

        // Generate the resume dynamically
        generateResume(formData);

        // Generate the unique URL
        const userName = formData.name.toLowerCase().replace(/\s+/g, "");
        const uniqueUrl = `resume-viewer.html?username=${userName}`;
        localStorage.setItem(userName, JSON.stringify(formData)); // Save data

        // Update the shareable link
        shareableLink.href = uniqueUrl;
        shareableLink.textContent = `Open Resume: ${uniqueUrl}`;
        shareableLink.style.display = "inline"; // Make the link visible

        // Enable "Copy Link" button
        copyLinkBtn.style.display = "inline-block";
        copyLinkBtn.addEventListener("click", function () {
            copyToClipboard(window.location.origin + `/${uniqueUrl}`);
            alert("Link copied to clipboard!");
        });
    });

    // Function to generate and display the resume (non-editable)
    function generateResume(data) {
        if (data.name && data.email && data.degree && data.school && data.gradYear && data.jobTitle && data.company && data.skills.length > 0) {
            resumeContent.innerHTML = `
                <h3>${data.name}</h3>
                <p>Email: ${data.email}</p>
                <h4>Education</h4>
                <p>${data.degree} from ${data.school} (Class of ${data.gradYear})</p>
                <h4>Work Experience</h4>
                <p>${data.jobTitle} at ${data.company} (${data.years} years)</p>
                <h4>Skills</h4>
                <ul>
                    ${data.skills.map((skill) => `<li>${skill}</li>`).join('')}
                </ul>
            `;
        } else {
            console.log("Incomplete data for resume generation.");
            alert("Please fill out all fields correctly.");
        }
    }

    // Function to copy link to clipboard
    function copyToClipboard(text) {
        const tempInput = document.createElement("input");
        document.body.appendChild(tempInput);
        tempInput.value = text;
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
    }

    // Download resume as PDF
    downloadBtn.addEventListener("click", function () {
        const resumeElement = document.getElementById("resume");
        const opt = {
            margin: 1,
            filename: "Resume.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };
        html2pdf().from(resumeElement).set(opt).save();
    });
});

  