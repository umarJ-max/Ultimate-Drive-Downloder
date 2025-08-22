# 🚀 Ultimate Drive Downloader

A powerful, professional Google Apps Script web application for downloading files from Google Drive with a beautiful, responsive interface.

![Ultimate Drive Downloader](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=for-the-badge&logo=google&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

## ✨ Features

- 🎯 **Direct Downloads** - Generate instant download links for Google Drive files
- 📁 **Folder Support** - Browse and download individual files from folders
- 📄 **Google Workspace Export** - Convert Google Docs, Sheets, and Slides to Office formats
- 🎨 **Professional UI** - Modern, responsive design with dark/light theme
- 📱 **Mobile Friendly** - Works perfectly on all devices
- ⚡ **Fast & Reliable** - Optimized for performance and stability
- 🔒 **Secure** - No data stored, direct Google Drive API integration

## ⚠️ Important Usage Guidelines

| Feature | Description |
|---------|-------------|
| 📄 **Single Files Only** | Works best with individual files. Folders are listed but downloaded one by one. |
| 📏 **File Size Limits** | Avoid GB-sized files for best results. Large files may require Google sign-in. |
| 🔗 **Sharing Required** | Files must be shared with "Anyone with the link" permissions. |
| ✨ **Works Best With** | Google Docs, Sheets, Slides, images, documents, and regular files. |

## 🚀 Quick Start

### 1. Create Google Apps Script Project

1. Go to [Google Apps Script](https://script.google.com/)
2. Click **"New Project"**
3. Replace the default code with the files from this repository

### 2. Add the Files

Copy these files to your Google Apps Script project:

- **`Code.gs`** - Main backend logic
- **`index.html`** - Frontend interface
- **`appscript.json`** - Project configuration

### 3. Deploy as Web App

1. Click **"Deploy"** → **"New deployment"**
2. Choose **"Web app"** as type
3. Set **"Execute as"** to **"Me"**
4. Set **"Who has access"** to **"Anyone"**
5. Click **"Deploy"**

### 4. Authorize Permissions

1. Click **"Authorize access"**
2. Choose your Google account
3. Click **"Advanced"** → **"Go to [project name] (unsafe)"**
4. Click **"Allow"**

## 📖 Usage Guide

### For Single Files

1. **Share your file**: Set Google Drive file to "Anyone with the link"
2. **Copy the URL**: From browser address bar or Drive share button
3. **Paste in tool**: Enter URL in the input field
4. **Download**: Choose your preferred download format

### For Folders

1. **Share folder**: Set to "Anyone with the link" permissions
2. **Get folder URL**: Copy the folder link from Google Drive
3. **Browse files**: Tool will list all files in the folder
4. **Download individually**: Each file gets its own download button

### Supported URL Formats

```
✅ https://drive.google.com/file/d/FILE_ID/view
✅ https://drive.google.com/folders/FOLDER_ID
✅ https://docs.google.com/document/d/DOC_ID/edit
✅ https://docs.google.com/spreadsheets/d/SHEET_ID/edit
✅ https://docs.google.com/presentation/d/SLIDE_ID/edit
✅ Just the File ID: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
```

## 🔧 Technical Details

### Backend (`Code.gs`)

- **`doGet()`** - Serves the web interface
- **`downloadFromDrive(url)`** - Main function to process downloads
- **`extractId(url)`** - Extracts file/folder ID from various URL formats
- **`testFunction()`** - Backend connectivity test

### Frontend (`index.html`)

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark/Light Theme** - User preference with localStorage
- **Real-time Feedback** - Loading states and error handling
- **Multiple Download Options** - Different formats for different needs

### Permissions Required

```json
{
  "oauthScopes": [
    "https://www.googleapis.com/auth/drive.readonly",
    "https://www.googleapis.com/auth/script.external_request"
  ]
}
```

## 🎯 File Type Support

| File Type | Direct Download | Export Options |
|-----------|----------------|----------------|
| 📄 Google Docs | ✅ | Word (.docx), PDF, Text |
| 📊 Google Sheets | ✅ | Excel (.xlsx), PDF, CSV |
| 📺 Google Slides | ✅ | PowerPoint (.pptx), PDF |
| 🖼️ Images | ✅ | Original format |
| 📁 Documents | ✅ | Original format |
| 🎥 Videos | ✅ | Original format |
| 🎵 Audio | ✅ | Original format |

## 🛠️ Troubleshooting

### Common Issues

**"Cannot access this Google Drive item"**
- ✅ Make sure file is shared with "Anyone with the link"
- ✅ Check if file still exists and isn't deleted
- ✅ Verify the URL is correct

**"Large file download fails"**
- ✅ Try using "Browser Download" option
- ✅ Sign in to Google account in browser
- ✅ Consider using Google Drive's built-in download

**"Export options not showing"**
- ✅ Only Google Workspace files have export options
- ✅ Regular files use direct download links

### Getting Help

1. **Check the Console**: Use browser developer tools to see error messages
2. **Verify Permissions**: Ensure proper Google Drive sharing settings
3. **Test Backend**: Use the "Test Connection" button to verify setup

## 🚀 Deployment Tips

### For Personal Use
- Deploy with "Execute as: Me" and "Anyone" access
- Keep the default web app URL

### For Team/Organization
- Consider using "Execute as: User accessing the web app"
- Set up proper domain restrictions if needed
- Monitor usage through Google Apps Script dashboard

## 📝 Changelog

### Version 1.0.0 (2025-08-22)
- ✨ Initial release
- 🎨 Professional UI with dark/light theme
- 📁 Single file and folder support
- 📄 Google Workspace export options
- 📱 Mobile-responsive design
- ⚠️ Clear usage limitations

## 👨‍💻 Author

**Umar J** - [@umarJ-max](https://github.com/umarJ-max)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⭐ Support

If this project helped you, please give it a ⭐ on GitHub!

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/umarJ-max">Umar J</a></p>
  <p>🚀 <strong>Ultimate Drive Downloader</strong> - Professional Google Drive Download Tool</p>
</div>
