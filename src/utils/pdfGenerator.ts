import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ResumeData } from '@/types/resume';

export async function generatePDF(resumeData: ResumeData, templateId: string): Promise<void> {
  try {
    // Create a temporary div to render the resume
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = generateResumeHTML(resumeData, templateId);
    tempDiv.style.width = '8.5in';
    tempDiv.style.minHeight = '11in';
    tempDiv.style.padding = '0.5in';
    tempDiv.style.fontFamily = 'Arial, sans-serif';
    tempDiv.style.fontSize = '12px';
    tempDiv.style.lineHeight = '1.4';
    tempDiv.style.backgroundColor = 'white';
    tempDiv.style.position = 'absolute';
    tempDiv.style.top = '-10000px';
    tempDiv.style.left = '-10000px';

    document.body.appendChild(tempDiv);

    // Convert to canvas
    const canvas = await html2canvas(tempDiv, {
      width: 816, // 8.5in * 96dpi
      height: 1056, // 11in * 96dpi
      scale: 2,
      useCORS: true,
      allowTaint: true
    });

    // Remove temporary div
    document.body.removeChild(tempDiv);

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: 'letter'
    });

    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, 8.5, 11);

    // Download PDF
    const fileName = `${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_Resume.pdf`;
    pdf.save(fileName);

  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
}

function generateResumeHTML(data: ResumeData): string {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  return `
    <div style="font-family: Arial, sans-serif; font-size: 12px; line-height: 1.4; color: #333;">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #3B82F6; padding-bottom: 20px;">
        <h1 style="font-size: 28px; font-weight: bold; margin: 0 0 10px 0; color: #1F2937;">
          ${data.personalInfo.firstName} ${data.personalInfo.lastName}
        </h1>
        <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 15px; color: #6B7280;">
          ${data.personalInfo.email ? `<span>📧 ${data.personalInfo.email}</span>` : ''}
          ${data.personalInfo.phone ? `<span>📞 ${data.personalInfo.phone}</span>` : ''}
          ${data.personalInfo.location ? `<span>📍 ${data.personalInfo.location}</span>` : ''}
          ${data.personalInfo.website ? `<span>🌐 ${data.personalInfo.website}</span>` : ''}
          ${data.personalInfo.linkedin ? `<span>💼 LinkedIn</span>` : ''}
          ${data.personalInfo.github ? `<span>🐙 GitHub</span>` : ''}
        </div>
      </div>

      <!-- Professional Summary -->
      ${data.summary ? `
        <div style="margin-bottom: 25px;">
          <h2 style="font-size: 18px; font-weight: bold; margin: 0 0 10px 0; color: #1F2937; border-bottom: 1px solid #E5E7EB; padding-bottom: 5px;">
            Professional Summary
          </h2>
          <p style="margin: 0; color: #374151; line-height: 1.6;">
            ${data.summary}
          </p>
        </div>
      ` : ''}

      <!-- Experience -->
      ${data.experience.length > 0 ? `
        <div style="margin-bottom: 25px;">
          <h2 style="font-size: 18px; font-weight: bold; margin: 0 0 15px 0; color: #1F2937; border-bottom: 1px solid #E5E7EB; padding-bottom: 5px;">
            Professional Experience
          </h2>
          ${data.experience.map(exp => `
            <div style="margin-bottom: 20px; border-left: 3px solid #3B82F6; padding-left: 15px;">
              <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 5px;">
                <div>
                  <h3 style="font-size: 14px; font-weight: bold; margin: 0; color: #1F2937;">
                    ${exp.position}
                  </h3>
                  <p style="font-size: 13px; font-weight: 600; margin: 2px 0; color: #374151;">
                    ${exp.company}
                  </p>
                </div>
                <div style="font-size: 11px; color: #6B7280;">
                  ${formatDate(exp.startDate)} - ${exp.isCurrent ? 'Present' : formatDate(exp.endDate)}
                </div>
              </div>
              ${exp.description ? `
                <p style="font-size: 12px; color: #6B7280; margin: 5px 0;">
                  ${exp.description}
                </p>
              ` : ''}
              ${exp.achievements.length > 0 ? `
                <ul style="margin: 8px 0; padding-left: 20px; color: #374151;">
                  ${exp.achievements.map(achievement => `
                    <li style="margin: 3px 0; font-size: 12px;">${achievement}</li>
                  `).join('')}
                </ul>
              ` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Education -->
      ${data.education.length > 0 ? `
        <div style="margin-bottom: 25px;">
          <h2 style="font-size: 18px; font-weight: bold; margin: 0 0 15px 0; color: #1F2937; border-bottom: 1px solid #E5E7EB; padding-bottom: 5px;">
            Education
          </h2>
          ${data.education.map(edu => `
            <div style="margin-bottom: 15px; border-left: 3px solid #10B981; padding-left: 15px;">
              <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 5px;">
                <div>
                  <h3 style="font-size: 14px; font-weight: bold; margin: 0; color: #1F2937;">
                    ${edu.degree} in ${edu.field}
                  </h3>
                  <p style="font-size: 13px; font-weight: 600; margin: 2px 0; color: #374151;">
                    ${edu.institution}
                  </p>
                </div>
                <div style="font-size: 11px; color: #6B7280;">
                  ${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}
                </div>
              </div>
              <div style="font-size: 12px; color: #6B7280;">
                ${edu.gpa ? `GPA: ${edu.gpa}` : ''}
                ${edu.honors ? `${edu.gpa ? ' • ' : ''}${edu.honors}` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Skills -->
      ${data.skills.length > 0 ? `
        <div style="margin-bottom: 25px;">
          <h2 style="font-size: 18px; font-weight: bold; margin: 0 0 15px 0; color: #1F2937; border-bottom: 1px solid #E5E7EB; padding-bottom: 5px;">
            Skills
          </h2>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
            ${['technical', 'soft', 'language'].map(category => {
              const categorySkills = data.skills.filter(skill => skill.category === category);
              if (categorySkills.length === 0) return '';
              
              return `
                <div>
                  <h3 style="font-size: 13px; font-weight: bold; margin: 0 0 8px 0; color: #1F2937;">
                    ${category === 'technical' ? 'Technical Skills' : 
                      category === 'soft' ? 'Soft Skills' : 'Languages'}
                  </h3>
                  <div style="display: flex; flex-wrap: wrap; gap: 5px;">
                    ${categorySkills.map(skill => `
                      <span style="background: #F3F4F6; color: #374151; padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: 500;">
                        ${skill.name}
                      </span>
                    `).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Projects -->
      ${data.projects.length > 0 ? `
        <div style="margin-bottom: 25px;">
          <h2 style="font-size: 18px; font-weight: bold; margin: 0 0 15px 0; color: #1F2937; border-bottom: 1px solid #E5E7EB; padding-bottom: 5px;">
            Projects
          </h2>
          ${data.projects.map(project => `
            <div style="margin-bottom: 15px; border-left: 3px solid #8B5CF6; padding-left: 15px;">
              <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 5px;">
                <div>
                  <h3 style="font-size: 14px; font-weight: bold; margin: 0; color: #1F2937;">
                    ${project.title}
                  </h3>
                  <p style="font-size: 12px; color: #6B7280; margin: 5px 0;">
                    ${project.description}
                  </p>
                </div>
                ${project.startDate ? `
                  <div style="font-size: 11px; color: #6B7280;">
                    ${formatDate(project.startDate)} - ${project.endDate ? formatDate(project.endDate) : 'Present'}
                  </div>
                ` : ''}
              </div>
              ${project.technologies.length > 0 ? `
                <div style="display: flex; flex-wrap: wrap; gap: 5px; margin: 8px 0;">
                  ${project.technologies.map(tech => `
                    <span style="background: #F3F4F6; color: #374151; padding: 2px 6px; border-radius: 8px; font-size: 10px; font-weight: 500;">
                      ${tech}
                    </span>
                  `).join('')}
                </div>
              ` : ''}
              <div style="font-size: 11px; color: #6B7280;">
                ${project.url ? `🌐 Live Demo` : ''}
                ${project.github ? `${project.url ? ' • ' : ''}🐙 Source Code` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;
}