// // client/src/pages/admin/DatabaseBackup.jsx
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import {
//   Download, Upload, Database, FileJson, FileArchive, 
//   Trash2, RefreshCw, Loader2, CheckCircle, XCircle,
//   AlertTriangle, ChevronRight, Clock, HardDrive, Package
// } from 'lucide-react';
// import toast from 'react-hot-toast';
// import api from '../../api/apiConfig';

// const DatabaseBackup = () => {
//   const [loading, setLoading] = useState(false);
//   const [restoring, setRestoring] = useState(false);
//   const [backupInfo, setBackupInfo] = useState(null);
//   const [scheduledBackups, setScheduledBackups] = useState([]);
//   const [selectedCollections, setSelectedCollections] = useState([]);
//   const [clearExisting, setClearExisting] = useState(true);
//   const [keepIds, setKeepIds] = useState(false);
//   const [backupFile, setBackupFile] = useState(null);
//   const [restoreResult, setRestoreResult] = useState(null);

//   // Fetch backup info
//   const fetchBackupInfo = async () => {
//     setLoading(true);
//     try {
//       const response = await api.get('/backup/info');
//       setBackupInfo(response.data?.data || response.data);
//     } catch (error) {
//       console.error('Error fetching backup info:', error);
//       toast.error('Failed to fetch backup info');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch scheduled backups
//   const fetchScheduledBackups = async () => {
//     try {
//       const response = await api.get('/backup/list');
//       setScheduledBackups(response.data?.data?.backups || []);
//     } catch (error) {
//       console.error('Error fetching scheduled backups:', error);
//     }
//   };

//   useEffect(() => {
//     fetchBackupInfo();
//     fetchScheduledBackups();
//   }, []);

//   // Create full backup
//   const handleFullBackup = async () => {
//     setLoading(true);
//     try {
//       const response = await api.get('/backup/full', { responseType: 'blob' });
//       const url = window.URL.createObjectURL(response.data);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `full_backup_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       window.URL.revokeObjectURL(url);
//       toast.success('Full backup created successfully');
//     } catch (error) {
//       console.error('Backup error:', error);
//       toast.error('Failed to create backup');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Create compressed backup
//   const handleCompressedBackup = async () => {
//     setLoading(true);
//     try {
//       const response = await api.get('/backup/compressed', { responseType: 'blob' });
//       const url = window.URL.createObjectURL(response.data);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `full_backup_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.zip`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       window.URL.revokeObjectURL(url);
//       toast.success('Compressed backup created successfully');
//     } catch (error) {
//       console.error('Backup error:', error);
//       toast.error('Failed to create compressed backup');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Create scheduled backup
//   const handleScheduledBackup = async () => {
//     setLoading(true);
//     try {
//       await api.post('/backup/scheduled');
//       toast.success('Scheduled backup created successfully');
//       fetchScheduledBackups();
//     } catch (error) {
//       console.error('Scheduled backup error:', error);
//       toast.error('Failed to create scheduled backup');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Download scheduled backup
//   const handleDownloadScheduledBackup = async (filename) => {
//     try {
//       const response = await api.get(`/backup/download/${filename}`, { responseType: 'blob' });
//       const url = window.URL.createObjectURL(response.data);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = filename;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       window.URL.revokeObjectURL(url);
//       toast.success('Backup downloaded');
//     } catch (error) {
//       console.error('Download error:', error);
//       toast.error('Failed to download backup');
//     }
//   };

//   // Delete scheduled backup
//   const handleDeleteBackup = async (filename) => {
//     if (!window.confirm(`Are you sure you want to delete ${filename}?`)) return;
    
//     try {
//       await api.delete(`/backup/delete/${filename}`);
//       toast.success('Backup deleted');
//       fetchScheduledBackups();
//     } catch (error) {
//       console.error('Delete error:', error);
//       toast.error('Failed to delete backup');
//     }
//   };

//   // Handle restore
//   const handleRestore = async () => {
//     if (!backupFile) {
//       toast.error('Please select a backup file');
//       return;
//     }

//     if (!window.confirm('WARNING: This will overwrite existing data. Are you sure?')) return;

//     setRestoring(true);
//     setRestoreResult(null);

//     const formData = new FormData();
//     formData.append('backupFile', backupFile);
    
//     const params = new URLSearchParams();
//     if (clearExisting) params.append('clearExisting', 'true');
//     if (keepIds) params.append('keepIds', 'true');

//     try {
//       const response = await api.post(`/backup/restore?${params.toString()}`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       setRestoreResult(response.data?.data || response.data);
//       toast.success('Database restored successfully');
//       fetchBackupInfo();
//     } catch (error) {
//       console.error('Restore error:', error);
//       toast.error(error.response?.data?.message || 'Failed to restore database');
//       setRestoreResult({ error: error.response?.data?.message });
//     } finally {
//       setRestoring(false);
//       setBackupFile(null);
//     }
//   };

//   // Handle selective restore
//   const handleSelectiveRestore = async (collectionName) => {
//     if (!backupFile) {
//       toast.error('Please select a backup file');
//       return;
//     }

//     if (!window.confirm(`Restore ${collectionName}? This will overwrite existing data.`)) return;

//     setRestoring(true);

//     const formData = new FormData();
//     formData.append('backupFile', backupFile);
    
//     const params = new URLSearchParams();
//     if (clearExisting) params.append('clearExisting', 'true');
//     if (keepIds) params.append('keepIds', 'true');

//     try {
//       const response = await api.post(`/backup/restore/${collectionName}?${params.toString()}`, formData, {
//         headers: { 'Content-Type':multipart/form-data' }
//       });
//       toast.success(`${collectionName} restored successfully`);
//       fetchBackupInfo();
//     } catch (error) {
//       console.error('Restore error:', error);
//       toast.error(`Failed to restore ${collectionName}`);
//     } finally {
//       setRestoring(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Database Backup & Restore</h1>
//           <p className="text-gray-500">Create backups of your entire database and restore when needed</p>
//         </div>
//         <div className="flex gap-2">
//           <button
//             onClick={handleScheduledBackup}
//             disabled={loading}
//             className="btn-secondary inline-flex items-center gap-2"
//           >
//             <Clock className="h-4 w-4" />
//             <span>Scheduled Backup</span>
//           </button>
//           <button
//             onClick={handleCompressedBackup}
//             disabled={loading}
//             className="btn-secondary inline-flex items-center gap-2"
//           >
//             <FileArchive className="h-4 w-4" />
//             <span>Compressed Backup</span>
//           </button>
//           <button
//             onClick={handleFullBackup}
//             disabled={loading}
//             className="btn-primary inline-flex items-center gap-2"
//           >
//             {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
//             <span>Full Backup</span>
//           </button>
//         </div>
//       </div>

//       {/* Database Stats */}
//       {backupInfo && (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div className="card p-4 text-center">
//             <HardDrive className="h-6 w-6 text-primary-600 mx-auto mb-2" />
//             <p className="text-2xl font-bold text-gray-900">{backupInfo.totalRecords?.toLocaleString()}</p>
//             <p className="text-sm text-gray-500">Total Records</p>
//           </div>
//           <div className="card p-4 text-center">
//             <Database className="h-6 w-6 text-primary-600 mx-auto mb-2" />
//             <p className="text-2xl font-bold text-gray-900">{Object.keys(backupInfo.collections || {}).length}</p>
//             <p className="text-sm text-gray-500">Collections</p>
//           </div>
//           <div className="card p-4 text-center">
//             <Package className="h-6 w-6 text-primary-600 mx-auto mb-2" />
//             <p className="text-2xl font-bold text-gray-900">{scheduledBackups.length}</p>
//             <p className="text-sm text-gray-500">Saved Backups</p>
//           </div>
//           <div className="card p-4 text-center">
//             <RefreshCw className="h-6 w-6 text-primary-600 mx-auto mb-2" />
//             <p className="text-2xl font-bold text-gray-900">{backupInfo.database}</p>
//             <p className="text-sm text-gray-500">Database</p>
//           </div>
//         </div>
//       )}

//       {/* Database Collections Overview */}
//       {backupInfo?.collections && (
//         <div className="card">
//           <h2 className="text-lg font-bold text-gray-900 mb-4">Database Collections</h2>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Collection</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Record Count</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {Object.entries(backupInfo.collections).map(([name, info]) => (
//                   <tr key={name} className="hover:bg-gray-50">
//                     <td className="px-4 py-3">
//                       <span className="font-medium text-gray-900 capitalize">{name}</span>
//                     </td>
//                     <td className="px-4 py-3 text-gray-600">{info.count.toLocaleString()}</td>
//                     <td className="px-4 py-3">
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleSelectiveRestore(name)}
//                           disabled={restoring || !backupFile}
//                           className="text-xs text-blue-600 hover:text-blue-800"
//                         >
//                           Restore
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Restore Section */}
//       <div className="card">
//         <h2 className="text-lg font-bold text-gray-900 mb-4">Restore Database</h2>
        
//         <div className="space-y-4">
//           <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
//             <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//             <p className="text-gray-600 mb-2">Upload backup file to restore database</p>
//             <p className="text-sm text-gray-400">Supports JSON files from full backup</p>
//             <input
//               type="file"
//               accept=".json"
//               onChange={(e) => setBackupFile(e.target.files[0])}
//               className="mt-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
//             />
//           </div>

//           <div className="flex flex-wrap gap-4">
//             <label className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={clearExisting}
//                 onChange={(e) => setClearExisting(e.target.checked)}
//                 className="h-4 w-4 rounded border-gray-300 text-primary-600"
//               />
//               <span className="text-sm text-gray-700">Clear existing data before restore</span>
//             </label>
//             <label className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={keepIds}
//                 onChange={(e) => setKeepIds(e.target.checked)}
//                 className="h-4 w-4 rounded border-gray-300 text-primary-600"
//               />
//               <span className="text-sm text-gray-700">Keep original IDs</span>
//             </label>
//           </div>

//           <button
//             onClick={handleRestore}
//             disabled={!backupFile || restoring}
//             className="btn-primary w-full md:w-auto disabled:opacity-50"
//           >
//             {restoring ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : 'Restore Database'}
//           </button>

//           {restoreResult && (
//             <div className={`mt-4 p-4 rounded-lg ${restoreResult.error ? 'bg-red-50' : 'bg-green-50'}`}>
//               <div className="flex items-center gap-2 mb-2">
//                 {restoreResult.error ? (
//                   <XCircle className="h-5 w-5 text-red-600" />
//                 ) : (
//                   <CheckCircle className="h-5 w-5 text-green-600" />
//                 )}
//                 <h3 className="font-medium">{restoreResult.error ? 'Restore Failed' : 'Restore Completed'}</h3>
//               </div>
//               {restoreResult.restored && (
//                 <div className="space-y-1 text-sm">
//                   {restoreResult.restored.map((item, idx) => (
//                     <p key={idx} className="text-green-700">
//                       ✅ {item.collection}: {item.count}/{item.total} records restored
//                     </p>
//                   ))}
//                 </div>
//               )}
//               {restoreResult.failed && restoreResult.failed.length > 0 && (
//                 <div className="mt-2">
//                   <p className="text-sm text-red-700 font-medium">Failed:</p>
//                   {restoreResult.failed.map((item, idx) => (
//                     <p key={idx} className="text-sm text-red-600">❌ {item.collection}: {item.error}</p>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Scheduled Backups */}
//       {scheduledBackups.length > 0 && (
//         <div className="card">
//           <h2 className="text-lg font-bold text-gray-900 mb-4">Saved Backups</h2>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Filename</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Size</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Created</th>
//                   <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {scheduledBackups.map((backup, idx) => (
//                   <tr key={idx} className="hover:bg-gray-50">
//                     <td className="px-4 py-3">
//                       <span className="font-mono text-sm text-gray-900">{backup.filename}</span>
//                     </td>
//                     <td className="px-4 py-3 text-gray-600">{backup.sizeFormatted}</td>
//                     <td className="px-4 py-3 text-gray-600">
//                       {new Date(backup.createdAt).toLocaleString()}
//                     </td>
//                     <td className="px-4 py-3 text-right">
//                       <div className="flex justify-end gap-2">
//                         <button
//                           onClick={() => handleDownloadScheduledBackup(backup.filename)}
//                           className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
//                           title="Download"
//                         >
//                           <Download className="h-4 w-4" />
//                         </button>
//                         <button
//                           onClick={() => handleDeleteBackup(backup.filename)}
//                           className="p-1.5 text-red-600 hover:bg-red-50 rounded"
//                           title="Delete"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DatabaseBackup;















// client/src/pages/admin/DatabaseBackup.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Download, Upload, Database, FileJson, FileArchive, 
  Trash2, RefreshCw, Loader2, CheckCircle, XCircle,
  AlertTriangle, ChevronRight, Clock, HardDrive, Package
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../api/apiConfig';

const DatabaseBackup = () => {
  const [loading, setLoading] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [backupInfo, setBackupInfo] = useState(null);
  const [scheduledBackups, setScheduledBackups] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [clearExisting, setClearExisting] = useState(true);
  const [keepIds, setKeepIds] = useState(false);
  const [backupFile, setBackupFile] = useState(null);
  const [restoreResult, setRestoreResult] = useState(null);

  // Fetch backup info
  const fetchBackupInfo = async () => {
    setLoading(true);
    try {
      const response = await api.get('/backup/info');
      setBackupInfo(response.data?.data || response.data);
    } catch (error) {
      console.error('Error fetching backup info:', error);
      toast.error('Failed to fetch backup info');
    } finally {
      setLoading(false);
    }
  };

  // Fetch scheduled backups
  const fetchScheduledBackups = async () => {
    try {
      const response = await api.get('/backup/list');
      setScheduledBackups(response.data?.data?.backups || []);
    } catch (error) {
      console.error('Error fetching scheduled backups:', error);
    }
  };

  useEffect(() => {
    fetchBackupInfo();
    fetchScheduledBackups();
  }, []);

  // Create full backup
  const handleFullBackup = async () => {
    setLoading(true);
    try {
      const response = await api.get('/backup/full', { responseType: 'blob' });
      const url = window.URL.createObjectURL(response.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = `full_backup_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success('Full backup created successfully');
    } catch (error) {
      console.error('Backup error:', error);
      toast.error('Failed to create backup');
    } finally {
      setLoading(false);
    }
  };

  // Create compressed backup
  const handleCompressedBackup = async () => {
    setLoading(true);
    try {
      const response = await api.get('/backup/compressed', { responseType: 'blob' });
      const url = window.URL.createObjectURL(response.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = `full_backup_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success('Compressed backup created successfully');
    } catch (error) {
      console.error('Backup error:', error);
      toast.error('Failed to create compressed backup');
    } finally {
      setLoading(false);
    }
  };

  // Create scheduled backup
  const handleScheduledBackup = async () => {
    setLoading(true);
    try {
      await api.post('/backup/scheduled');
      toast.success('Scheduled backup created successfully');
      fetchScheduledBackups();
    } catch (error) {
      console.error('Scheduled backup error:', error);
      toast.error('Failed to create scheduled backup');
    } finally {
      setLoading(false);
    }
  };

  // Download scheduled backup
  const handleDownloadScheduledBackup = async (filename) => {
    try {
      const response = await api.get(`/backup/download/${filename}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(response.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success('Backup downloaded');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download backup');
    }
  };

  // Delete scheduled backup
  const handleDeleteBackup = async (filename) => {
    if (!window.confirm(`Are you sure you want to delete ${filename}?`)) return;
    
    try {
      await api.delete(`/backup/delete/${filename}`);
      toast.success('Backup deleted');
      fetchScheduledBackups();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete backup');
    }
  };

  // Handle restore
  const handleRestore = async () => {
    if (!backupFile) {
      toast.error('Please select a backup file');
      return;
    }

    if (!window.confirm('WARNING: This will overwrite existing data. Are you sure?')) return;

    setRestoring(true);
    setRestoreResult(null);

    const formData = new FormData();
    formData.append('backupFile', backupFile);
    
    const params = new URLSearchParams();
    if (clearExisting) params.append('clearExisting', 'true');
    if (keepIds) params.append('keepIds', 'true');

    try {
      const response = await api.post(`/backup/restore?${params.toString()}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setRestoreResult(response.data?.data || response.data);
      toast.success('Database restored successfully');
      fetchBackupInfo();
    } catch (error) {
      console.error('Restore error:', error);
      toast.error(error.response?.data?.message || 'Failed to restore database');
      setRestoreResult({ error: error.response?.data?.message });
    } finally {
      setRestoring(false);
      setBackupFile(null);
    }
  };

  // Handle selective restore
  const handleSelectiveRestore = async (collectionName) => {
    if (!backupFile) {
      toast.error('Please select a backup file');
      return;
    }

    if (!window.confirm(`Restore ${collectionName}? This will overwrite existing data.`)) return;

    setRestoring(true);

    const formData = new FormData();
    formData.append('backupFile', backupFile);
    
    const params = new URLSearchParams();
    if (clearExisting) params.append('clearExisting', 'true');
    if (keepIds) params.append('keepIds', 'true');

    try {
      const response = await api.post(`/backup/restore/${collectionName}?${params.toString()}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success(`${collectionName} restored successfully`);
      fetchBackupInfo();
    } catch (error) {
      console.error('Restore error:', error);
      toast.error(`Failed to restore ${collectionName}`);
    } finally {
      setRestoring(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Database Backup & Restore</h1>
          <p className="text-gray-500">Create backups of your entire database and restore when needed</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleScheduledBackup}
            disabled={loading}
            className="btn-secondary inline-flex items-center gap-2"
          >
            <Clock className="h-4 w-4" />
            <span>Scheduled Backup</span>
          </button>
          <button
            onClick={handleCompressedBackup}
            disabled={loading}
            className="btn-secondary inline-flex items-center gap-2"
          >
            <FileArchive className="h-4 w-4" />
            <span>Compressed Backup</span>
          </button>
          <button
            onClick={handleFullBackup}
            disabled={loading}
            className="btn-primary inline-flex items-center gap-2"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            <span>Full Backup</span>
          </button>
        </div>
      </div>

      {/* Database Stats */}
      {backupInfo && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card p-4 text-center">
            <HardDrive className="h-6 w-6 text-primary-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{backupInfo.totalRecords?.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Total Records</p>
          </div>
          <div className="card p-4 text-center">
            <Database className="h-6 w-6 text-primary-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{Object.keys(backupInfo.collections || {}).length}</p>
            <p className="text-sm text-gray-500">Collections</p>
          </div>
          <div className="card p-4 text-center">
            <Package className="h-6 w-6 text-primary-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{scheduledBackups.length}</p>
            <p className="text-sm text-gray-500">Saved Backups</p>
          </div>
          <div className="card p-4 text-center">
            <RefreshCw className="h-6 w-6 text-primary-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{backupInfo.database}</p>
            <p className="text-sm text-gray-500">Database</p>
          </div>
        </div>
      )}

      {/* Database Collections Overview */}
      {backupInfo?.collections && (
        <div className="card">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Database Collections</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Collection</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Record Count</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Object.entries(backupInfo.collections).map(([name, info]) => (
                  <tr key={name} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span className="font-medium text-gray-900 capitalize">{name}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{info.count.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSelectiveRestore(name)}
                          disabled={restoring || !backupFile}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Restore
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Restore Section */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Restore Database</h2>
        
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Upload backup file to restore database</p>
            <p className="text-sm text-gray-400">Supports JSON files from full backup</p>
            <input
              type="file"
              accept=".json"
              onChange={(e) => setBackupFile(e.target.files[0])}
              className="mt-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={clearExisting}
                onChange={(e) => setClearExisting(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary-600"
              />
              <span className="text-sm text-gray-700">Clear existing data before restore</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={keepIds}
                onChange={(e) => setKeepIds(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary-600"
              />
              <span className="text-sm text-gray-700">Keep original IDs</span>
            </label>
          </div>

          <button
            onClick={handleRestore}
            disabled={!backupFile || restoring}
            className="btn-primary w-full md:w-auto disabled:opacity-50"
          >
            {restoring ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : 'Restore Database'}
          </button>

          {restoreResult && (
            <div className={`mt-4 p-4 rounded-lg ${restoreResult.error ? 'bg-red-50' : 'bg-green-50'}`}>
              <div className="flex items-center gap-2 mb-2">
                {restoreResult.error ? (
                  <XCircle className="h-5 w-5 text-red-600" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                )}
                <h3 className="font-medium">{restoreResult.error ? 'Restore Failed' : 'Restore Completed'}</h3>
              </div>
              {restoreResult.restored && (
                <div className="space-y-1 text-sm">
                  {restoreResult.restored.map((item, idx) => (
                    <p key={idx} className="text-green-700">
                      ✅ {item.collection}: {item.count}/{item.total} records restored
                    </p>
                  ))}
                </div>
              )}
              {restoreResult.failed && restoreResult.failed.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-red-700 font-medium">Failed:</p>
                  {restoreResult.failed.map((item, idx) => (
                    <p key={idx} className="text-sm text-red-600">❌ {item.collection}: {item.error}</p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Scheduled Backups */}
      {scheduledBackups.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Saved Backups</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Filename</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Size</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Created</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {scheduledBackups.map((backup, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span className="font-mono text-sm text-gray-900">{backup.filename}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{backup.sizeFormatted}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {new Date(backup.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleDownloadScheduledBackup(backup.filename)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                          title="Download"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteBackup(backup.filename)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatabaseBackup;