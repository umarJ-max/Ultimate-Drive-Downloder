// Umar Drive Pro - Google Drive Downloader
// Created by: Umar J (umarJ-max)
// Date: 2025-08-22

function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Umar Drive Pro - Google Drive Downloader')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function testFunction() {
  try {
    const user = Session.getActiveUser().getEmail();
    return {
      success: true,
      message: 'Backend working perfectly!',
      user: user,
      timestamp: new Date().toString()
    };
  } catch (error) {
    return {
      success: false,
      message: 'Test failed',
      error: error.toString()
    };
  }
}

function extractId(url) {
  if (!url) return null;
  
  url = url.trim().replace(/\s+/g, '');
  
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9-_]+)/,
    /\/folders\/([a-zA-Z0-9-_]+)/,
    /\/document\/d\/([a-zA-Z0-9-_]+)/,
    /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/,
    /\/presentation\/d\/([a-zA-Z0-9-_]+)/,
    /[?&]id=([a-zA-Z0-9-_]+)/,
    /^([a-zA-Z0-9-_]{25,})$/
  ];
  
  for (let pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      console.log('Found ID:', match[1]);
      return match[1];
    }
  }
  
  return null;
}

// MAIN FUNCTION - Generate download links
function downloadFromDrive(url) {
  console.log('=== DOWNLOAD FROM DRIVE START ===');
  console.log('URL received:', url);
  
  try {
    const id = extractId(url);
    if (!id) {
      return {
        success: false,
        error: 'Could not extract a valid Google Drive ID from the URL.'
      };
    }
    
    console.log('Processing ID:', id);
    
    // Try to access as file first
    try {
      const file = DriveApp.getFileById(id);
      console.log('File found:', file.getName());
      
      const name = file.getName();
      const size = file.getSize();
      const fileId = file.getId();
      
      let mimeType;
      try {
        mimeType = file.getBlob().getContentType();
        console.log('MIME type:', mimeType);
      } catch (e) {
        mimeType = 'application/octet-stream';
        console.log('Could not get MIME type, using default');
      }
      
      // Generate download options (simplified)
      const downloadOptions = [];
      
      // Primary download method
      const directUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
      downloadOptions.push({
        name: 'Direct Download',
        url: directUrl,
        format: 'Original',
        icon: '🚀',
        description: 'Best for most files'
      });
      
      // Alternative method
      const viewUrl = `https://drive.google.com/file/d/${fileId}/view`;
      downloadOptions.push({
        name: 'Browser Download',
        url: viewUrl,
        format: 'Browser',
        icon: '👁️',
        description: 'Open in browser first'
      });
      
      // Add Google Workspace exports if applicable
      if (mimeType === 'application/vnd.google-apps.document') {
        downloadOptions.push({
          name: 'Word Document',
          url: `https://docs.google.com/document/d/${fileId}/export?format=docx`,
          format: 'DOCX',
          icon: '📄',
          description: 'Microsoft Word format'
        });
      } else if (mimeType === 'application/vnd.google-apps.spreadsheet') {
        downloadOptions.push({
          name: 'Excel File',
          url: `https://docs.google.com/spreadsheets/d/${fileId}/export?format=xlsx`,
          format: 'XLSX',
          icon: '📊',
          description: 'Microsoft Excel format'
        });
      } else if (mimeType === 'application/vnd.google-apps.presentation') {
        downloadOptions.push({
          name: 'PowerPoint',
          url: `https://docs.google.com/presentation/d/${fileId}/export?format=pptx`,
          format: 'PPTX',
          icon: '📺',
          description: 'Microsoft PowerPoint format'
        });
      }
      
      console.log('Generated', downloadOptions.length, 'download options');
      
      const result = {
        success: true,
        type: 'file',
        name: name,
        size: size,
        mimeType: mimeType,
        id: fileId,
        downloadOptions: downloadOptions,
        isGoogleWorkspace: mimeType.includes('vnd.google-apps')
      };
      
      console.log('Returning result:', JSON.stringify(result, null, 2));
      return result;
      
    } catch (fileError) {
      console.log('File access failed, trying folder...');
      
      try {
        const folder = DriveApp.getFolderById(id);
        console.log('Folder found:', folder.getName());
        
        const files = folder.getFiles();
        const fileList = [];
        let totalSize = 0;
        let processedCount = 0;
        const maxFiles = 20;
        
        while (files.hasNext() && processedCount < maxFiles) {
          try {
            const file = files.next();
            const fileName = file.getName();
            const fileSize = file.getSize();
            const fileId = file.getId();
            
            // Generate working download URL for each file
            const fileDownloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
            
            fileList.push({
              name: fileName,
              size: fileSize,
              id: fileId,
              downloadUrl: fileDownloadUrl,
              icon: getFileIcon(fileName)
            });
            
            totalSize += fileSize;
            processedCount++;
            
          } catch (fileError) {
            console.log('Skipped file:', fileError.message);
          }
        }
        
        console.log('Processed', fileList.length, 'files in folder');
        
        return {
          success: true,
          type: 'folder',
          name: folder.getName(),
          id: folder.getId(),
          files: fileList,
          totalFound: fileList.length,
          totalSize: totalSize
        };
        
      } catch (folderError) {
        console.log('Both file and folder access failed');
        return {
          success: false,
          error: 'Cannot access this Google Drive item. Make sure it\'s shared properly with "Anyone with the link" permissions.'
        };
      }
    }
    
  } catch (error) {
    console.error('Critical error:', error);
    return {
      success: false,
      error: 'A system error occurred: ' + error.message
    };
  }
}

// Get file icon based on file name
function getFileIcon(fileName) {
  const ext = fileName.split('.').pop().toLowerCase();
  
  if (['mp4', 'avi', 'mov', 'mkv', 'wmv'].includes(ext)) return '🎥';
  if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(ext)) return '🖼️';
  if (['mp3', 'wav', 'flac', 'aac'].includes(ext)) return '🎵';
  if (['pdf'].includes(ext)) return '📕';
  if (['doc', 'docx'].includes(ext)) return '📄';
  if (['xls', 'xlsx'].includes(ext)) return '📊';
  if (['ppt', 'pptx'].includes(ext)) return '📺';
  if (['zip', 'rar', '7z'].includes(ext)) return '🗜️';
  if (['txt', 'md'].includes(ext)) return '📝';
  
  return '📎';
}
