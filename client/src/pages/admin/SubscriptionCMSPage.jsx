// //components/cms/SubscriptionCMSPage.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Grid,
//   Typography,
//   IconButton,
//   Chip,
//   Switch,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   FormControlLabel,
//   Checkbox,
//   Alert,
//   CircularProgress,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Tooltip,
//   Snackbar
// } from '@mui/material';
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Visibility as VisibilityIcon,
//   DragIndicator as DragIndicatorIcon
// } from '@mui/icons-material';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import axios from 'axios';

// const SubscriptionCMSPage = () => {
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [editingPlan, setEditingPlan] = useState(null);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
//   const [stats, setStats] = useState(null);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const [formData, setFormData] = useState({
//     planId: '',
//     name: 'basic',
//     displayName: '',
//     description: '',
//     price: { amount: 0, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: null,
//       audiobooksPerMonth: null,
//       unlimited: false,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 0,
//     badgeText: '',
//     recommended: false,
//     metadata: new Map()
//   });

//   useEffect(() => {
//     fetchPlans();
//     fetchStats();
//   }, []);

//   const fetchPlans = async () => {
//     try {
//       const response = await axios.get('/api/cms/subscriptions/plans');
//       setPlans(response.data.data);
//     } catch (error) {
//       showSnackbar('Error fetching plans', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchStats = async () => {
//     try {
//       const response = await axios.get('/api/cms/subscriptions/stats');
//       setStats(response.data.data);
//     } catch (error) {
//       console.error('Error fetching stats:', error);
//     }
//   };

//   const handleOpenDialog = (plan = null) => {
//     if (plan) {
//       setEditingPlan(plan);
//       setFormData({
//         planId: plan.planId,
//         name: plan.name,
//         displayName: plan.displayName,
//         description: plan.description || '',
//         price: plan.price,
//         billingCycle: plan.billingCycle,
//         features: plan.features || [],
//         limits: plan.limits,
//         isActive: plan.isActive,
//         displayOrder: plan.displayOrder,
//         badgeText: plan.badgeText || '',
//         recommended: plan.recommended,
//         metadata: plan.metadata || new Map()
//       });
//     } else {
//       setEditingPlan(null);
//       setFormData({
//         planId: '',
//         name: 'basic',
//         displayName: '',
//         description: '',
//         price: { amount: 0, currency: 'INR' },
//         billingCycle: 'monthly',
//         features: [],
//         limits: {
//           poemsPerDay: null,
//           ebooksPerMonth: null,
//           audiobooksPerMonth: null,
//           unlimited: false,
//           creator: false
//         },
//         isActive: true,
//         displayOrder: plans.length,
//         badgeText: '',
//         recommended: false,
//         metadata: new Map()
//       });
//     }
//     setDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setEditingPlan(null);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name.includes('.')) {
//       const [parent, child] = name.split('.');
//       setFormData(prev => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           [child]: value
//         }
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value
//       }));
//     }
//   };

//   const handleFeatureChange = (index, field, value) => {
//     const newFeatures = [...formData.features];
//     newFeatures[index] = { ...newFeatures[index], [field]: value };
//     setFormData(prev => ({ ...prev, features: newFeatures }));
//   };

//   const addFeature = () => {
//     setFormData(prev => ({
//       ...prev,
//       features: [...prev.features, { name: '', included: true, limit: null }]
//     }));
//   };

//   const removeFeature = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       features: prev.features.filter((_, i) => i !== index)
//     }));
//   };

//   const handleLimitChange = (limitName, value) => {
//     setFormData(prev => ({
//       ...prev,
//       limits: {
//         ...prev.limits,
//         [limitName]: value
//       }
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       if (editingPlan) {
//         await axios.put(`/api/cms/subscriptions/plans/${editingPlan._id}`, formData);
//         showSnackbar('Plan updated successfully', 'success');
//       } else {
//         await axios.post('/api/cms/subscriptions/plans', formData);
//         showSnackbar('Plan created successfully', 'success');
//       }
//       handleCloseDialog();
//       fetchPlans();
//       fetchStats();
//     } catch (error) {
//       showSnackbar(error.response?.data?.message || 'Error saving plan', 'error');
//     }
//   };

//   const handleDeletePlan = async (planId, hardDelete = false) => {
//     if (window.confirm(`Are you sure you want to ${hardDelete ? 'permanently delete' : 'deactivate'} this plan?`)) {
//       try {
//         await axios.delete(`/api/cms/subscriptions/plans/${planId}?hardDelete=${hardDelete}`);
//         showSnackbar('Plan deleted successfully', 'success');
//         fetchPlans();
//         fetchStats();
//       } catch (error) {
//         showSnackbar(error.response?.data?.message || 'Error deleting plan', 'error');
//       }
//     }
//   };

//   const handleToggleStatus = async (planId) => {
//     try {
//       await axios.patch(`/api/cms/subscriptions/plans/${planId}/toggle`);
//       showSnackbar('Plan status updated', 'success');
//       fetchPlans();
//     } catch (error) {
//       showSnackbar('Error updating status', 'error');
//     }
//   };

//   const handleDragEnd = async (result) => {
//     if (!result.destination) return;

//     const reorderedPlans = Array.from(plans);
//     const [removed] = reorderedPlans.splice(result.source.index, 1);
//     reorderedPlans.splice(result.destination.index, 0, removed);

//     const orders = reorderedPlans.map((plan, index) => ({
//       id: plan._id,
//       order: index
//     }));

//     setPlans(reorderedPlans);
    
//     try {
//       await axios.post('/api/cms/subscriptions/plans/reorder', { orders });
//       showSnackbar('Plans reordered successfully', 'success');
//     } catch (error) {
//       showSnackbar('Error reordering plans', 'error');
//       fetchPlans(); // Revert on error
//     }
//   };

//   const showSnackbar = (message, severity) => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box p={3}>
//       {/* Header */}
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//         <Typography variant="h4">Subscription Plans Management</Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<AddIcon />}
//           onClick={() => handleOpenDialog()}
//         >
//           Add New Plan
//         </Button>
//       </Box>

//       {/* Stats Cards */}
//       {stats && (
//         <Grid container spacing={3} mb={3}>
//           <Grid item xs={12} sm={6} md={3}>
//             <Card>
//               <CardContent>
//                 <Typography color="textSecondary" gutterBottom>
//                   Total Plans
//                 </Typography>
//                 <Typography variant="h4">
//                   {stats.totalPlans}
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   {stats.activePlans} Active
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <Card>
//               <CardContent>
//                 <Typography color="textSecondary" gutterBottom>
//                   Active Subscriptions
//                 </Typography>
//                 <Typography variant="h4">
//                   {stats.activeSubscriptions}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <Card>
//               <CardContent>
//                 <Typography color="textSecondary" gutterBottom>
//                   Total Users
//                 </Typography>
//                 <Typography variant="h4">
//                   {stats.totalUsers}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       )}

//       {/* Plans Table */}
//       <DragDropContext onDragEnd={handleDragEnd}>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell width={50}>Order</TableCell>
//                 <TableCell>Plan ID</TableCell>
//                 <TableCell>Display Name</TableCell>
//                 <TableCell>Price</TableCell>
//                 <TableCell>Billing Cycle</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Recommended</TableCell>
//                 <TableCell>Subscribers</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <Droppable droppableId="plans">
//               {(provided) => (
//                 <TableBody {...provided.droppableProps} ref={provided.innerRef}>
//                   {plans
//                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                     .map((plan, index) => (
//                       <Draggable key={plan._id} draggableId={plan._id} index={index}>
//                         {(provided) => (
//                           <TableRow
//                             ref={provided.innerRef}
//                             {...provided.draggableProps}
//                           >
//                             <TableCell {...provided.dragHandleProps}>
//                               <DragIndicatorIcon />
//                             </TableCell>
//                             <TableCell>
//                               <Typography variant="body2">{plan.planId}</Typography>
//                             </TableCell>
//                             <TableCell>
//                               <Typography variant="body2">{plan.displayName}</Typography>
//                               {plan.badgeText && (
//                                 <Chip label={plan.badgeText} size="small" color="primary" />
//                               )}
//                             </TableCell>
//                             <TableCell>
//                               ₹{plan.price.amount}/{plan.billingCycle === 'yearly' ? 'yr' : plan.billingCycle === 'quarterly' ? 'qtr' : 'mo'}
//                             </TableCell>
//                             <TableCell>
//                               <Chip 
//                                 label={plan.billingCycle} 
//                                 size="small" 
//                                 variant="outlined"
//                               />
//                             </TableCell>
//                             <TableCell>
//                               <Switch
//                                 checked={plan.isActive}
//                                 onChange={() => handleToggleStatus(plan._id)}
//                                 color="success"
//                               />
//                             </TableCell>
//                             <TableCell>
//                               {plan.recommended && (
//                                 <Chip label="Recommended" size="small" color="warning" />
//                               )}
//                             </TableCell>
//                             <TableCell>
//                               <Typography variant="body2">
//                                 {plan.metadata?.get('subscriberCount') || 0}
//                               </Typography>
//                             </TableCell>
//                             <TableCell>
//                               <Tooltip title="Edit">
//                                 <IconButton onClick={() => handleOpenDialog(plan)}>
//                                   <EditIcon />
//                                 </IconButton>
//                               </Tooltip>
//                               <Tooltip title="Deactivate">
//                                 <IconButton onClick={() => handleDeletePlan(plan._id, false)} color="warning">
//                                   <DeleteIcon />
//                                 </IconButton>
//                               </Tooltip>
//                               {!plan.isActive && (
//                                 <Tooltip title="Permanently Delete">
//                                   <IconButton onClick={() => handleDeletePlan(plan._id, true)} color="error">
//                                     <DeleteIcon />
//                                   </IconButton>
//                                 </Tooltip>
//                               )}
//                             </TableCell>
//                           </TableRow>
//                         )}
//                       </Draggable>
//                     ))}
//                   {provided.placeholder}
//                 </TableBody>
//               )}
//             </Droppable>
//           </Table>
//         </TableContainer>
//       </DragDropContext>

//       <TablePagination
//         rowsPerPageOptions={[5, 10, 25]}
//         component="div"
//         count={plans.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />

//       {/* Add/Edit Dialog */}
//       <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
//         <DialogTitle>
//           {editingPlan ? 'Edit Plan' : 'Add New Plan'}
//         </DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Plan ID"
//                 name="planId"
//                 value={formData.planId}
//                 onChange={handleInputChange}
//                 required
//                 disabled={!!editingPlan}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Display Name"
//                 name="displayName"
//                 value={formData.displayName}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 multiline
//                 rows={2}
//               />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <TextField
//                 fullWidth
//                 label="Price Amount"
//                 type="number"
//                 name="price.amount"
//                 value={formData.price.amount}
//                 onChange={handleInputChange}
//               />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <FormControl fullWidth>
//                 <InputLabel>Billing Cycle</InputLabel>
//                 <Select
//                   name="billingCycle"
//                   value={formData.billingCycle}
//                   onChange={handleInputChange}
//                   label="Billing Cycle"
//                 >
//                   <MenuItem value="monthly">Monthly</MenuItem>
//                   <MenuItem value="quarterly">Quarterly</MenuItem>
//                   <MenuItem value="yearly">Yearly</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <TextField
//                 fullWidth
//                 label="Badge Text"
//                 name="badgeText"
//                 value={formData.badgeText}
//                 onChange={handleInputChange}
//                 placeholder="e.g., Most Popular"
//               />
//             </Grid>
            
//             {/* Features Section */}
//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom>Features</Typography>
//               {formData.features.map((feature, index) => (
//                 <Box key={index} display="flex" gap={2} mb={2}>
//                   <TextField
//                     label="Feature Name"
//                     value={feature.name}
//                     onChange={(e) => handleFeatureChange(index, 'name', e.target.value)}
//                     fullWidth
//                   />
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={feature.included}
//                         onChange={(e) => handleFeatureChange(index, 'included', e.target.checked)}
//                       />
//                     }
//                     label="Included"
//                   />
//                   <TextField
//                     label="Limit (optional)"
//                     type="number"
//                     value={feature.limit || ''}
//                     onChange={(e) => handleFeatureChange(index, 'limit', e.target.value ? Number(e.target.value) : null)}
//                     sx={{ width: 150 }}
//                   />
//                   <IconButton onClick={() => removeFeature(index)} color="error">
//                     <DeleteIcon />
//                   </IconButton>
//                 </Box>
//               ))}
//               <Button onClick={addFeature} startIcon={<AddIcon />}>
//                 Add Feature
//               </Button>
//             </Grid>

//             {/* Limits Section */}
//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom>Usage Limits</Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={3}>
//                   <TextField
//                     fullWidth
//                     label="Poems Per Day"
//                     type="number"
//                     value={formData.limits.poemsPerDay || ''}
//                     onChange={(e) => handleLimitChange('poemsPerDay', e.target.value ? Number(e.target.value) : null)}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={3}>
//                   <TextField
//                     fullWidth
//                     label="Ebooks Per Month"
//                     type="number"
//                     value={formData.limits.ebooksPerMonth || ''}
//                     onChange={(e) => handleLimitChange('ebooksPerMonth', e.target.value ? Number(e.target.value) : null)}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={3}>
//                   <TextField
//                     fullWidth
//                     label="Audiobooks Per Month"
//                     type="number"
//                     value={formData.limits.audiobooksPerMonth || ''}
//                     onChange={(e) => handleLimitChange('audiobooksPerMonth', e.target.value ? Number(e.target.value) : null)}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={3}>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={formData.limits.unlimited}
//                         onChange={(e) => handleLimitChange('unlimited', e.target.checked)}
//                       />
//                     }
//                     label="Unlimited Access"
//                   />
//                 </Grid>
//               </Grid>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <FormControlLabel
//                 control={
//                   <Switch
//                     checked={formData.recommended}
//                     onChange={(e) => setFormData(prev => ({ ...prev, recommended: e.target.checked }))}
//                   />
//                 }
//                 label="Recommended Plan"
//               />
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Cancel</Button>
//           <Button onClick={handleSubmit} variant="contained" color="primary">
//             {editingPlan ? 'Update' : 'Create'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
//       >
//         <Alert severity={snackbar.severity} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default SubscriptionCMSPage;























// // client/src/pages/admin/SubscriptionCMSPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Grid,
//   Typography,
//   IconButton,
//   Chip,
//   Switch,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   FormControlLabel,
//   Checkbox,
//   Alert,
//   CircularProgress,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Tooltip,
//   Snackbar,
//   Tab,
//   Tabs
// } from '@mui/material';
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   DragIndicator as DragIndicatorIcon,
//   PeopleIcon,
//   MoneyIcon,
//   CreditCard as CreditCardIcon
// } from '@mui/icons-material';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import axios from 'axios';

// const API_BASE = '/api/subscriptionAPI';

// const SubscriptionCMSPage = () => {
//   // Get token from Redux store instead of Context
//   const { token } = useSelector((state) => state.auth);
  
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [editingPlan, setEditingPlan] = useState(null);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
//   const [stats, setStats] = useState(null);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [activeTab, setActiveTab] = useState(0);

//   const [formData, setFormData] = useState({
//     planId: '',
//     name: 'basic',
//     displayName: '',
//     description: '',
//     price: { amount: 0, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: null,
//       audiobooksPerMonth: null,
//       unlimited: false,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 0,
//     badgeText: '',
//     recommended: false,
//     metadata: new Map()
//   });

//   // Axios interceptor for auth token
//   useEffect(() => {
//     const interceptor = axios.interceptors.request.use(
//       (config) => {
//         if (token) {
//           config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//       },
//       (error) => {
//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       axios.interceptors.request.eject(interceptor);
//     };
//   }, [token]);

//   useEffect(() => {
//     fetchPlans();
//     fetchStats();
//   }, []);

//   const fetchPlans = async () => {
//     try {
//       const response = await axios.get(`${API_BASE}/plans`);
//       setPlans(response.data.data || []);
//     } catch (error) {
//       showSnackbar(error.response?.data?.message || 'Error fetching plans', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchStats = async () => {
//     try {
//       const response = await axios.get(`${API_BASE}/stats`);
//       setStats(response.data.data);
//     } catch (error) {
//       console.error('Error fetching stats:', error);
//     }
//   };

//   const handleOpenDialog = (plan = null) => {
//     if (plan) {
//       setEditingPlan(plan);
//       setFormData({
//         planId: plan.planId,
//         name: plan.name,
//         displayName: plan.displayName,
//         description: plan.description || '',
//         price: plan.price,
//         billingCycle: plan.billingCycle,
//         features: plan.features || [],
//         limits: plan.limits,
//         isActive: plan.isActive,
//         displayOrder: plan.displayOrder,
//         badgeText: plan.badgeText || '',
//         recommended: plan.recommended,
//         metadata: plan.metadata || new Map()
//       });
//     } else {
//       setEditingPlan(null);
//       setFormData({
//         planId: '',
//         name: 'basic',
//         displayName: '',
//         description: '',
//         price: { amount: 0, currency: 'INR' },
//         billingCycle: 'monthly',
//         features: [],
//         limits: {
//           poemsPerDay: null,
//           ebooksPerMonth: null,
//           audiobooksPerMonth: null,
//           unlimited: false,
//           creator: false
//         },
//         isActive: true,
//         displayOrder: plans.length,
//         badgeText: '',
//         recommended: false,
//         metadata: new Map()
//       });
//     }
//     setDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setEditingPlan(null);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name.includes('.')) {
//       const [parent, child] = name.split('.');
//       setFormData(prev => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           [child]: value
//         }
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value
//       }));
//     }
//   };

//   const handleFeatureChange = (index, field, value) => {
//     const newFeatures = [...formData.features];
//     newFeatures[index] = { ...newFeatures[index], [field]: value };
//     setFormData(prev => ({ ...prev, features: newFeatures }));
//   };

//   const addFeature = () => {
//     setFormData(prev => ({
//       ...prev,
//       features: [...prev.features, { name: '', included: true, limit: null }]
//     }));
//   };

//   const removeFeature = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       features: prev.features.filter((_, i) => i !== index)
//     }));
//   };

//   const handleLimitChange = (limitName, value) => {
//     setFormData(prev => ({
//       ...prev,
//       limits: {
//         ...prev.limits,
//         [limitName]: value
//       }
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       if (editingPlan) {
//         await axios.put(`${API_BASE}/plans/${editingPlan._id}`, formData);
//         showSnackbar('Plan updated successfully', 'success');
//       } else {
//         await axios.post(`${API_BASE}/plans`, formData);
//         showSnackbar('Plan created successfully', 'success');
//       }
//       handleCloseDialog();
//       fetchPlans();
//       fetchStats();
//     } catch (error) {
//       showSnackbar(error.response?.data?.message || 'Error saving plan', 'error');
//     }
//   };

//   const handleDeletePlan = async (planId, permanent = false) => {
//     const action = permanent ? 'permanently delete' : 'deactivate';
//     if (window.confirm(`Are you sure you want to ${action} this plan?`)) {
//       try {
//         await axios.delete(`${API_BASE}/plans/${planId}?permanent=${permanent}`);
//         showSnackbar(`Plan ${permanent ? 'deleted' : 'deactivated'} successfully`, 'success');
//         fetchPlans();
//         fetchStats();
//       } catch (error) {
//         showSnackbar(error.response?.data?.message || 'Error deleting plan', 'error');
//       }
//     }
//   };

//   const handleToggleStatus = async (planId) => {
//     try {
//       await axios.patch(`${API_BASE}/plans/${planId}/toggle`);
//       showSnackbar('Plan status updated', 'success');
//       fetchPlans();
//     } catch (error) {
//       showSnackbar('Error updating status', 'error');
//     }
//   };

//   const handleDragEnd = async (result) => {
//     if (!result.destination) return;

//     const reorderedPlans = Array.from(plans);
//     const [removed] = reorderedPlans.splice(result.source.index, 1);
//     reorderedPlans.splice(result.destination.index, 0, removed);

//     const orders = reorderedPlans.map((plan, index) => ({
//       id: plan._id,
//       order: index
//     }));

//     setPlans(reorderedPlans);
    
//     try {
//       await axios.post(`${API_BASE}/plans/reorder`, { orders });
//       showSnackbar('Plans reordered successfully', 'success');
//     } catch (error) {
//       showSnackbar('Error reordering plans', 'error');
//       fetchPlans();
//     }
//   };

//   const showSnackbar = (message, severity) => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box p={3}>
//       {/* Header */}
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//         <Typography variant="h4">Subscription Plans Management</Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<AddIcon />}
//           onClick={() => handleOpenDialog()}
//         >
//           Add New Plan
//         </Button>
//       </Box>

//       {/* Tabs */}
//       <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ mb: 3 }}>
//         <Tab label="Plans Management" />
//         <Tab label="Statistics & Analytics" />
//       </Tabs>

//       {/* Stats Cards - Only show on analytics tab */}
//       {activeTab === 1 && stats && (
//         <Grid container spacing={3} mb={3}>
//           <Grid item xs={12} sm={6} md={3}>
//             <Card>
//               <CardContent>
//                 <Box display="flex" alignItems="center" justifyContent="space-between">
//                   <Box>
//                     <Typography color="textSecondary" gutterBottom>
//                       Total Plans
//                     </Typography>
//                     <Typography variant="h4">
//                       {stats.totalPlans}
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary">
//                       {stats.activePlans} Active
//                     </Typography>
//                   </Box>
//                   <CreditCardIcon color="primary" sx={{ fontSize: 40 }} />
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <Card>
//               <CardContent>
//                 <Box display="flex" alignItems="center" justifyContent="space-between">
//                   <Box>
//                     <Typography color="textSecondary" gutterBottom>
//                       Active Subscriptions
//                     </Typography>
//                     <Typography variant="h4">
//                       {stats.activeSubscriptions}
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary">
//                       Active paying users
//                     </Typography>
//                   </Box>
//                   <PeopleIcon color="secondary" sx={{ fontSize: 40 }} />
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <Card>
//               <CardContent>
//                 <Box display="flex" alignItems="center" justifyContent="space-between">
//                   <Box>
//                     <Typography color="textSecondary" gutterBottom>
//                       Total Users
//                     </Typography>
//                     <Typography variant="h4">
//                       {stats.totalUsers}
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary">
//                       Registered users
//                     </Typography>
//                   </Box>
//                   <PeopleIcon sx={{ fontSize: 40 }} />
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <Card>
//               <CardContent>
//                 <Box display="flex" alignItems="center" justifyContent="space-between">
//                   <Box>
//                     <Typography color="textSecondary" gutterBottom>
//                       Monthly Revenue
//                     </Typography>
//                     <Typography variant="h4">
//                       ₹{stats.revenue?.totalMonthlyRevenue || 0}
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary">
//                       Avg: ₹{stats.revenue?.averageSubscriptionValue || 0}/sub
//                     </Typography>
//                   </Box>
//                   <MoneyIcon color="success" sx={{ fontSize: 40 }} />
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       )}

//       {/* Plan Distribution Chart (Analytics Tab) */}
//       {activeTab === 1 && stats?.planDistribution && (
//         <Grid container spacing={3} mb={3}>
//           <Grid item xs={12}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                   Plan Distribution
//                 </Typography>
//                 <Grid container spacing={2}>
//                   {stats.planDistribution.map((dist) => (
//                     <Grid item xs={6} sm={3} key={dist._id}>
//                       <Paper sx={{ p: 2, textAlign: 'center' }}>
//                         <Typography variant="h5">{dist.count}</Typography>
//                         <Typography color="textSecondary" textTransform="capitalize">
//                           {dist._id} Plan
//                         </Typography>
//                       </Paper>
//                     </Grid>
//                   ))}
//                 </Grid>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       )}

//       {/* Plans Table - Show on plans management tab */}
//       {activeTab === 0 && (
//         <DragDropContext onDragEnd={handleDragEnd}>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell width={50}>Order</TableCell>
//                   <TableCell>Plan ID</TableCell>
//                   <TableCell>Display Name</TableCell>
//                   <TableCell>Price</TableCell>
//                   <TableCell>Billing Cycle</TableCell>
//                   <TableCell>Status</TableCell>
//                   <TableCell>Recommended</TableCell>
//                   <TableCell>Subscribers</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <Droppable droppableId="plans">
//                 {(provided) => (
//                   <TableBody {...provided.droppableProps} ref={provided.innerRef}>
//                     {plans
//                       .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                       .map((plan, index) => (
//                         <Draggable key={plan._id} draggableId={plan._id} index={index}>
//                           {(provided) => (
//                             <TableRow
//                               ref={provided.innerRef}
//                               {...provided.draggableProps}
//                             >
//                               <TableCell {...provided.dragHandleProps}>
//                                 <DragIndicatorIcon />
//                               </TableCell>
//                               <TableCell>
//                                 <Typography variant="body2">{plan.planId}</Typography>
//                               </TableCell>
//                               <TableCell>
//                                 <Typography variant="body2">{plan.displayName}</Typography>
//                                 {plan.badgeText && (
//                                   <Chip label={plan.badgeText} size="small" color="primary" sx={{ ml: 1 }} />
//                                 )}
//                               </TableCell>
//                               <TableCell>
//                                 ₹{plan.price.amount}/{plan.billingCycle === 'yearly' ? 'yr' : plan.billingCycle === 'quarterly' ? 'qtr' : 'mo'}
//                               </TableCell>
//                               <TableCell>
//                                 <Chip 
//                                   label={plan.billingCycle} 
//                                   size="small" 
//                                   variant="outlined"
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 <Switch
//                                   checked={plan.isActive}
//                                   onChange={() => handleToggleStatus(plan._id)}
//                                   color="success"
//                                 />
//                               </TableCell>
//                               <TableCell>
//                                 {plan.recommended && (
//                                   <Chip label="Recommended" size="small" color="warning" />
//                                 )}
//                               </TableCell>
//                               <TableCell>
//                                 <Typography variant="body2">
//                                   {plan.metadata?.subscriberCount || 0}
//                                 </Typography>
//                               </TableCell>
//                               <TableCell>
//                                 <Tooltip title="Edit">
//                                   <IconButton onClick={() => handleOpenDialog(plan)}>
//                                     <EditIcon />
//                                   </IconButton>
//                                 </Tooltip>
//                                 <Tooltip title="Deactivate">
//                                   <IconButton onClick={() => handleDeletePlan(plan._id, false)} color="warning">
//                                     <DeleteIcon />
//                                   </IconButton>
//                                 </Tooltip>
//                                 {!plan.isActive && (
//                                   <Tooltip title="Permanently Delete">
//                                     <IconButton onClick={() => handleDeletePlan(plan._id, true)} color="error">
//                                       <DeleteIcon />
//                                     </IconButton>
//                                   </Tooltip>
//                                 )}
//                               </TableCell>
//                             </TableRow>
//                           )}
//                         </Draggable>
//                       ))}
//                     {provided.placeholder}
//                   </TableBody>
//                 )}
//               </Droppable>
//             </Table>
//           </TableContainer>
//         </DragDropContext>
//       )}

//       <TablePagination
//         rowsPerPageOptions={[5, 10, 25]}
//         component="div"
//         count={plans.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />

//       {/* Add/Edit Dialog */}
//       <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
//         <DialogTitle>
//           {editingPlan ? 'Edit Plan' : 'Add New Plan'}
//         </DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Plan ID"
//                 name="planId"
//                 value={formData.planId}
//                 onChange={handleInputChange}
//                 required
//                 disabled={!!editingPlan}
//                 helperText="Must be: free, basic, premium, or pro"
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Display Name"
//                 name="displayName"
//                 value={formData.displayName}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 multiline
//                 rows={2}
//               />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <TextField
//                 fullWidth
//                 label="Price Amount"
//                 type="number"
//                 name="price.amount"
//                 value={formData.price.amount}
//                 onChange={handleInputChange}
//               />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <FormControl fullWidth>
//                 <InputLabel>Billing Cycle</InputLabel>
//                 <Select
//                   name="billingCycle"
//                   value={formData.billingCycle}
//                   onChange={handleInputChange}
//                   label="Billing Cycle"
//                 >
//                   <MenuItem value="monthly">Monthly</MenuItem>
//                   <MenuItem value="quarterly">Quarterly</MenuItem>
//                   <MenuItem value="yearly">Yearly</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <TextField
//                 fullWidth
//                 label="Badge Text"
//                 name="badgeText"
//                 value={formData.badgeText}
//                 onChange={handleInputChange}
//                 placeholder="e.g., Most Popular"
//               />
//             </Grid>
            
//             {/* Features Section */}
//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom>Features</Typography>
//               {formData.features.map((feature, index) => (
//                 <Box key={index} display="flex" gap={2} mb={2} alignItems="center">
//                   <TextField
//                     label="Feature Name"
//                     value={feature.name}
//                     onChange={(e) => handleFeatureChange(index, 'name', e.target.value)}
//                     fullWidth
//                   />
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={feature.included}
//                         onChange={(e) => handleFeatureChange(index, 'included', e.target.checked)}
//                       />
//                     }
//                     label="Included"
//                   />
//                   <TextField
//                     label="Limit (optional)"
//                     type="number"
//                     value={feature.limit || ''}
//                     onChange={(e) => handleFeatureChange(index, 'limit', e.target.value ? Number(e.target.value) : null)}
//                     sx={{ width: 150 }}
//                   />
//                   <IconButton onClick={() => removeFeature(index)} color="error">
//                     <DeleteIcon />
//                   </IconButton>
//                 </Box>
//               ))}
//               <Button onClick={addFeature} startIcon={<AddIcon />} size="small">
//                 Add Feature
//               </Button>
//             </Grid>

//             {/* Limits Section */}
//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom>Usage Limits</Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={3}>
//                   <TextField
//                     fullWidth
//                     label="Poems Per Day"
//                     type="number"
//                     value={formData.limits.poemsPerDay || ''}
//                     onChange={(e) => handleLimitChange('poemsPerDay', e.target.value ? Number(e.target.value) : null)}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={3}>
//                   <TextField
//                     fullWidth
//                     label="Ebooks Per Month"
//                     type="number"
//                     value={formData.limits.ebooksPerMonth || ''}
//                     onChange={(e) => handleLimitChange('ebooksPerMonth', e.target.value ? Number(e.target.value) : null)}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={3}>
//                   <TextField
//                     fullWidth
//                     label="Audiobooks Per Month"
//                     type="number"
//                     value={formData.limits.audiobooksPerMonth || ''}
//                     onChange={(e) => handleLimitChange('audiobooksPerMonth', e.target.value ? Number(e.target.value) : null)}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={3}>
//                   <Box>
//                     <FormControlLabel
//                       control={
//                         <Checkbox
//                           checked={formData.limits.unlimited}
//                           onChange={(e) => handleLimitChange('unlimited', e.target.checked)}
//                         />
//                       }
//                       label="Unlimited Access"
//                     />
//                     <FormControlLabel
//                       control={
//                         <Checkbox
//                           checked={formData.limits.creator}
//                           onChange={(e) => handleLimitChange('creator', e.target.checked)}
//                         />
//                       }
//                       label="Creator Tools"
//                     />
//                   </Box>
//                 </Grid>
//               </Grid>
//             </Grid>

//             <Grid item xs={12}>
//               <FormControlLabel
//                 control={
//                   <Switch
//                     checked={formData.recommended}
//                     onChange={(e) => setFormData(prev => ({ ...prev, recommended: e.target.checked }))}
//                   />
//                 }
//                 label="Mark as Recommended Plan"
//               />
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Cancel</Button>
//           <Button onClick={handleSubmit} variant="contained" color="primary">
//             {editingPlan ? 'Update' : 'Create'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
//       >
//         <Alert severity={snackbar.severity} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default SubscriptionCMSPage;

















// // client/src/pages/admin/SubscriptionCMSPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Plus, Edit, Trash2, Users, DollarSign, CreditCard,
//   X, Loader2, GripVertical, TrendingUp
// } from 'lucide-react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const API_BASE = '/api/subscriptionAPI';

// const SubscriptionCMSPage = () => {
//   const { token } = useSelector((state) => state.auth);
  
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [editingPlan, setEditingPlan] = useState(null);
//   const [stats, setStats] = useState(null);
//   const [activeTab, setActiveTab] = useState('plans');

//   const [formData, setFormData] = useState({
//     planId: '',
//     name: 'basic',
//     displayName: '',
//     description: '',
//     price: { amount: 0, currency: 'INR' },
//     billingCycle: 'monthly',
//     features: [],
//     limits: {
//       poemsPerDay: null,
//       ebooksPerMonth: null,
//       audiobooksPerMonth: null,
//       unlimited: false,
//       creator: false
//     },
//     isActive: true,
//     displayOrder: 0,
//     badgeText: '',
//     recommended: false
//   });

//   // Axios interceptor for auth token
//   useEffect(() => {
//     const interceptor = axios.interceptors.request.use(
//       (config) => {
//         if (token) {
//           config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//       },
//       (error) => Promise.reject(error)
//     );

//     return () => {
//       axios.interceptors.request.eject(interceptor);
//     };
//   }, [token]);

//   useEffect(() => {
//     fetchPlans();
//     fetchStats();
//   }, []);

//   const fetchPlans = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${API_BASE}/plans`);
//       setPlans(response.data.data || []);
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Error fetching plans');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchStats = async () => {
//     try {
//       const response = await axios.get(`${API_BASE}/stats`);
//       setStats(response.data.data);
//     } catch (error) {
//       console.error('Error fetching stats:', error);
//     }
//   };

//   const handleOpenModal = (plan = null) => {
//     if (plan) {
//       setEditingPlan(plan);
//       setFormData({
//         planId: plan.planId,
//         name: plan.name,
//         displayName: plan.displayName,
//         description: plan.description || '',
//         price: plan.price,
//         billingCycle: plan.billingCycle,
//         features: plan.features || [],
//         limits: plan.limits,
//         isActive: plan.isActive,
//         displayOrder: plan.displayOrder,
//         badgeText: plan.badgeText || '',
//         recommended: plan.recommended
//       });
//     } else {
//       setEditingPlan(null);
//       setFormData({
//         planId: '',
//         name: 'basic',
//         displayName: '',
//         description: '',
//         price: { amount: 0, currency: 'INR' },
//         billingCycle: 'monthly',
//         features: [],
//         limits: {
//           poemsPerDay: null,
//           ebooksPerMonth: null,
//           audiobooksPerMonth: null,
//           unlimited: false,
//           creator: false
//         },
//         isActive: true,
//         displayOrder: plans.length,
//         badgeText: '',
//         recommended: false
//       });
//     }
//     setShowAddModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowAddModal(false);
//     setEditingPlan(null);
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (name.includes('.')) {
//       const [parent, child] = name.split('.');
//       setFormData(prev => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           [child]: type === 'checkbox' ? checked : value
//         }
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value
//       }));
//     }
//   };

//   const handleFeatureChange = (index, field, value) => {
//     const newFeatures = [...formData.features];
//     newFeatures[index] = { ...newFeatures[index], [field]: value };
//     setFormData(prev => ({ ...prev, features: newFeatures }));
//   };

//   const addFeature = () => {
//     setFormData(prev => ({
//       ...prev,
//       features: [...prev.features, { name: '', included: true, limit: null }]
//     }));
//   };

//   const removeFeature = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       features: prev.features.filter((_, i) => i !== index)
//     }));
//   };

//   const handleLimitChange = (limitName, value) => {
//     setFormData(prev => ({
//       ...prev,
//       limits: {
//         ...prev.limits,
//         [limitName]: value
//       }
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       if (editingPlan) {
//         await axios.put(`${API_BASE}/plans/${editingPlan._id}`, formData);
//         toast.success('Plan updated successfully');
//       } else {
//         await axios.post(`${API_BASE}/plans`, formData);
//         toast.success('Plan created successfully');
//       }
//       handleCloseModal();
//       fetchPlans();
//       fetchStats();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Error saving plan');
//     }
//   };

//   const handleDeletePlan = async (planId) => {
//     if (!window.confirm('Are you sure you want to delete this plan?')) return;
    
//     try {
//       await axios.delete(`${API_BASE}/plans/${planId}`);
//       toast.success('Plan deleted successfully');
//       fetchPlans();
//       fetchStats();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Error deleting plan');
//     }
//   };

//   const handleToggleStatus = async (planId) => {
//     try {
//       await axios.patch(`${API_BASE}/plans/${planId}/toggle`);
//       toast.success('Plan status updated');
//       fetchPlans();
//     } catch (error) {
//       toast.error('Error updating status');
//     }
//   };

//   const handleDragEnd = async (result) => {
//     if (!result.destination) return;

//     const reorderedPlans = Array.from(plans);
//     const [removed] = reorderedPlans.splice(result.source.index, 1);
//     reorderedPlans.splice(result.destination.index, 0, removed);

//     const orders = reorderedPlans.map((plan, index) => ({
//       id: plan._id,
//       order: index
//     }));

//     setPlans(reorderedPlans);
    
//     try {
//       await axios.post(`${API_BASE}/plans/reorder`, { orders });
//       toast.success('Plans reordered successfully');
//     } catch (error) {
//       toast.success('Error reordering plans');
//       fetchPlans();
//     }
//   };

//   const formatPrice = (amount, currency = 'INR') => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: currency,
//       minimumFractionDigits: 0
//     }).format(amount);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Subscription Plans Management</h1>
//           <p className="text-gray-500">Manage subscription plans, pricing, and features</p>
//         </div>
//         <button
//           onClick={() => handleOpenModal()}
//           className="btn-primary inline-flex items-center space-x-2"
//         >
//           <Plus className="h-5 w-5" />
//           <span>Add New Plan</span>
//         </button>
//       </div>

//       {/* Stats Summary */}
//       {stats && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           <div className="card p-4 text-center">
//             <div className="flex items-center justify-between mb-2">
//               <CreditCard className="h-5 w-5 text-primary-600" />
//               <span className="text-2xl font-bold text-gray-900">{stats.totalPlans}</span>
//             </div>
//             <p className="text-sm text-gray-500">Total Plans</p>
//             <p className="text-xs text-gray-400">{stats.activePlans} Active</p>
//           </div>
//           <div className="card p-4 text-center">
//             <div className="flex items-center justify-between mb-2">
//               <Users className="h-5 w-5 text-primary-600" />
//               <span className="text-2xl font-bold text-gray-900">{stats.activeSubscriptions}</span>
//             </div>
//             <p className="text-sm text-gray-500">Active Subscriptions</p>
//           </div>
//           <div className="card p-4 text-center">
//             <div className="flex items-center justify-between mb-2">
//               <Users className="h-5 w-5 text-primary-600" />
//               <span className="text-2xl font-bold text-gray-900">{stats.totalUsers}</span>
//             </div>
//             <p className="text-sm text-gray-500">Total Users</p>
//           </div>
//           <div className="card p-4 text-center">
//             <div className="flex items-center justify-between mb-2">
//               <DollarSign className="h-5 w-5 text-primary-600" />
//               <span className="text-2xl font-bold text-gray-900">
//                 {formatPrice(stats.revenue?.totalMonthlyRevenue || 0)}
//               </span>
//             </div>
//             <p className="text-sm text-gray-500">Monthly Revenue</p>
//           </div>
//         </div>
//       )}

//       {/* Tabs */}
//       <div className="flex space-x-1 border-b border-gray-200">
//         <button
//           onClick={() => setActiveTab('plans')}
//           className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
//             activeTab === 'plans'
//               ? 'border-primary-600 text-primary-600'
//               : 'border-transparent text-gray-500 hover:text-gray-700'
//           }`}
//         >
//           Plans Management
//         </button>
//         <button
//           onClick={() => setActiveTab('analytics')}
//           className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
//             activeTab === 'analytics'
//               ? 'border-primary-600 text-primary-600'
//               : 'border-transparent text-gray-500 hover:text-gray-700'
//           }`}
//         >
//           Statistics & Analytics
//         </button>
//       </div>

//       {/* Plans Management Tab */}
//       {activeTab === 'plans' && (
//         <DragDropContext onDragEnd={handleDragEnd}>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">Order</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan ID</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Display Name</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Billing Cycle</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommended</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscribers</th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <Droppable droppableId="plans">
//                 {(provided) => (
//                   <tbody {...provided.droppableProps} ref={provided.innerRef}>
//                     {plans.map((plan, index) => (
//                       <Draggable key={plan._id} draggableId={plan._id} index={index}>
//                         {(provided) => (
//                           <tr
//                             ref={provided.innerRef}
//                             {...provided.draggableProps}
//                             className="border-b border-gray-200 hover:bg-gray-50"
//                           >
//                             <td className="px-6 py-4" {...provided.dragHandleProps}>
//                               <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
//                             </td>
//                             <td className="px-6 py-4 text-sm text-gray-900">{plan.planId}</td>
//                             <td className="px-6 py-4">
//                               <span className="text-sm font-medium text-gray-900">{plan.displayName}</span>
//                               {plan.badgeText && (
//                                 <span className="ml-2 inline-flex px-2 py-0.5 text-xs rounded-full bg-primary-100 text-primary-700">
//                                   {plan.badgeText}
//                                 </span>
//                               )}
//                             </td>
//                             <td className="px-6 py-4 text-sm text-gray-900">
//                               {formatPrice(plan.price.amount, plan.price.currency)}/{plan.billingCycle === 'yearly' ? 'yr' : plan.billingCycle === 'quarterly' ? 'qtr' : 'mo'}
//                             </td>
//                             <td className="px-6 py-4">
//                               <span className="inline-flex px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700 capitalize">
//                                 {plan.billingCycle}
//                               </span>
//                             </td>
//                             <td className="px-6 py-4">
//                               <button
//                                 onClick={() => handleToggleStatus(plan._id)}
//                                 className={`inline-flex px-2 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors ${
//                                   plan.isActive 
//                                     ? 'bg-green-100 text-green-700 hover:bg-green-200' 
//                                     : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
//                                 }`}
//                               >
//                                 {plan.isActive ? 'Active' : 'Inactive'}
//                               </button>
//                             </td>
//                             <td className="px-6 py-4">
//                               {plan.recommended && (
//                                 <span className="inline-flex px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-700">
//                                   Recommended
//                                 </span>
//                               )}
//                             </td>
//                             <td className="px-6 py-4 text-sm text-gray-500">
//                               {plan.metadata?.subscriberCount || 0}
//                             </td>
//                             <td className="px-6 py-4 text-right">
//                               <div className="flex items-center justify-end space-x-2">
//                                 <button
//                                   onClick={() => handleOpenModal(plan)}
//                                   className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600"
//                                   title="Edit Plan"
//                                 >
//                                   <Edit className="h-4 w-4" />
//                                 </button>
//                                 <button
//                                   onClick={() => handleDeletePlan(plan._id)}
//                                   className="p-1.5 rounded-lg hover:bg-gray-100 text-red-600"
//                                   title="Delete Plan"
//                                 >
//                                   <Trash2 className="h-4 w-4" />
//                                 </button>
//                               </div>
//                             </td>
//                           </tr>
//                         )}
//                       </Draggable>
//                     ))}
//                     {provided.placeholder}
//                   </tbody>
//                 )}
//               </Droppable>
//             </table>
//           </div>
//         </DragDropContext>
//       )}

//       {/* Analytics Tab */}
//       {activeTab === 'analytics' && stats?.planDistribution && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {stats.planDistribution.map((dist) => (
//             <div key={dist._id} className="card p-6 text-center">
//               <h3 className="text-lg font-semibold text-gray-900 capitalize mb-2">{dist._id}</h3>
//               <p className="text-3xl font-bold text-primary-600">{dist.count}</p>
//               <p className="text-sm text-gray-500 mt-1">Subscribers</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Add/Edit Plan Modal */}
//       <AnimatePresence>
//         {showAddModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//             >
//               <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//                 <h2 className="text-xl font-bold text-gray-900">
//                   {editingPlan ? 'Edit Plan' : 'Add New Plan'}
//                 </h2>
//                 <button onClick={handleCloseModal} className="p-2 rounded-lg hover:bg-gray-100">
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>

//               <div className="p-6 space-y-4">
//                 {/* Basic Info */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Plan ID</label>
//                     <input
//                       type="text"
//                       name="planId"
//                       value={formData.planId}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       placeholder="free, basic, premium, pro"
//                       disabled={!!editingPlan}
//                     />
//                     <p className="text-xs text-gray-500 mt-1">Must be unique identifier</p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
//                     <input
//                       type="text"
//                       name="displayName"
//                       value={formData.displayName}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       placeholder="Free, Basic, Premium, Pro"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     className="input-field h-24"
//                     placeholder="Describe the plan..."
//                   />
//                 </div>

//                 {/* Pricing */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Price Amount</label>
//                     <input
//                       type="number"
//                       name="price.amount"
//                       value={formData.price.amount}
//                       onChange={handleInputChange}
//                       className="input-field"
//                       placeholder="0"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
//                     <select
//                       name="price.currency"
//                       value={formData.price.currency}
//                       onChange={handleInputChange}
//                       className="input-field"
//                     >
//                       <option value="INR">INR</option>
//                       <option value="USD">USD</option>
//                       <option value="EUR">EUR</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Billing Cycle</label>
//                     <select
//                       name="billingCycle"
//                       value={formData.billingCycle}
//                       onChange={handleInputChange}
//                       className="input-field"
//                     >
//                       <option value="monthly">Monthly</option>
//                       <option value="quarterly">Quarterly</option>
//                       <option value="yearly">Yearly</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Badge */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Badge Text (Optional)</label>
//                   <input
//                     type="text"
//                     name="badgeText"
//                     value={formData.badgeText}
//                     onChange={handleInputChange}
//                     className="input-field"
//                     placeholder="e.g., Most Popular, Best Value"
//                   />
//                 </div>

//                 {/* Features */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
//                   <div className="space-y-2">
//                     {formData.features.map((feature, index) => (
//                       <div key={index} className="flex items-center gap-2">
//                         <input
//                           type="text"
//                           value={feature.name}
//                           onChange={(e) => handleFeatureChange(index, 'name', e.target.value)}
//                           className="input-field flex-1"
//                           placeholder="Feature name"
//                         />
//                         <label className="flex items-center gap-1">
//                           <input
//                             type="checkbox"
//                             checked={feature.included}
//                             onChange={(e) => handleFeatureChange(index, 'included', e.target.checked)}
//                             className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                           />
//                           <span className="text-sm text-gray-600">Included</span>
//                         </label>
//                         <input
//                           type="number"
//                           value={feature.limit || ''}
//                           onChange={(e) => handleFeatureChange(index, 'limit', e.target.value ? Number(e.target.value) : null)}
//                           className="input-field w-24"
//                           placeholder="Limit"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeFeature(index)}
//                           className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </button>
//                       </div>
//                     ))}
//                     <button
//                       type="button"
//                       onClick={addFeature}
//                       className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
//                     >
//                       <Plus className="h-4 w-4" /> Add Feature
//                     </button>
//                   </div>
//                 </div>

//                 {/* Limits */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Usage Limits</label>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm text-gray-600 mb-1">Poems Per Day</label>
//                       <input
//                         type="number"
//                         value={formData.limits.poemsPerDay || ''}
//                         onChange={(e) => handleLimitChange('poemsPerDay', e.target.value ? Number(e.target.value) : null)}
//                         className="input-field"
//                         placeholder="Unlimited"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm text-gray-600 mb-1">Ebooks Per Month</label>
//                       <input
//                         type="number"
//                         value={formData.limits.ebooksPerMonth || ''}
//                         onChange={(e) => handleLimitChange('ebooksPerMonth', e.target.value ? Number(e.target.value) : null)}
//                         className="input-field"
//                         placeholder="Unlimited"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm text-gray-600 mb-1">Audiobooks Per Month</label>
//                       <input
//                         type="number"
//                         value={formData.limits.audiobooksPerMonth || ''}
//                         onChange={(e) => handleLimitChange('audiobooksPerMonth', e.target.value ? Number(e.target.value) : null)}
//                         className="input-field"
//                         placeholder="Unlimited"
//                       />
//                     </div>
//                     <div className="flex items-center gap-4 pt-2">
//                       <label className="flex items-center gap-2">
//                         <input
//                           type="checkbox"
//                           checked={formData.limits.unlimited}
//                           onChange={(e) => handleLimitChange('unlimited', e.target.checked)}
//                           className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                         />
//                         <span className="text-sm text-gray-700">Unlimited Access</span>
//                       </label>
//                       <label className="flex items-center gap-2">
//                         <input
//                           type="checkbox"
//                           checked={formData.limits.creator}
//                           onChange={(e) => handleLimitChange('creator', e.target.checked)}
//                           className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                         />
//                         <span className="text-sm text-gray-700">Creator Tools</span>
//                       </label>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Status */}
//                 <div className="flex items-center gap-4">
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       name="recommended"
//                       checked={formData.recommended}
//                       onChange={handleInputChange}
//                       className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                     />
//                     <span className="text-sm text-gray-700">Mark as Recommended Plan</span>
//                   </label>
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       name="isActive"
//                       checked={formData.isActive}
//                       onChange={handleInputChange}
//                       className="h-4 w-4 rounded border-gray-300 text-primary-600"
//                     />
//                     <span className="text-sm text-gray-700">Active</span>
//                   </label>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
//                   <button
//                     onClick={handleSubmit}
//                     className="btn-primary flex-1"
//                   >
//                     {editingPlan ? 'Update Plan' : 'Create Plan'}
//                   </button>
//                   <button
//                     onClick={handleCloseModal}
//                     className="px-4 py-2.5 text-gray-600 hover:text-gray-800 font-medium"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default SubscriptionCMSPage;
























// client/src/pages/admin/SubscriptionCMSPage.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Edit, Trash2, Users, DollarSign, CreditCard,
  X, Loader2, GripVertical, TrendingUp
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import toast from 'react-hot-toast';
import subscriptionAPI from '../../api/subscriptionAPI';

const SubscriptionCMSPage = () => {
  const { token } = useSelector((state) => state.auth);
  
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('plans');

  const [formData, setFormData] = useState({
    planId: '',
    name: 'basic',
    displayName: '',
    description: '',
    price: { amount: 0, currency: 'INR' },
    billingCycle: 'monthly',
    features: [],
    limits: {
      poemsPerDay: null,
      ebooksPerMonth: null,
      audiobooksPerMonth: null,
      unlimited: false,
      creator: false
    },
    isActive: true,
    displayOrder: 0,
    badgeText: '',
    recommended: false
  });

  useEffect(() => {
    fetchPlans();
    fetchStats();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const response = await subscriptionAPI.getAllPlansCMS();
      // Handle both possible response structures
      const plansData = response.data || response;
      setPlans(Array.isArray(plansData) ? plansData : []);
    } catch (error) {
      console.error('Error fetching plans:', error);
      toast.error(error.response?.data?.message || 'Error fetching plans');
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await subscriptionAPI.getSubscriptionStatsCMS();
      const statsData = response.data || response;
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error(error.response?.data?.message || 'Error fetching statistics');
    }
  };

  const handleOpenModal = (plan = null) => {
    if (plan) {
      setEditingPlan(plan);
      setFormData({
        planId: plan.planId,
        name: plan.name || plan.planId,
        displayName: plan.displayName,
        description: plan.description || '',
        price: plan.price || { amount: 0, currency: 'INR' },
        billingCycle: plan.billingCycle || 'monthly',
        features: plan.features || [],
        limits: plan.limits || {
          poemsPerDay: null,
          ebooksPerMonth: null,
          audiobooksPerMonth: null,
          unlimited: false,
          creator: false
        },
        isActive: plan.isActive !== undefined ? plan.isActive : true,
        displayOrder: plan.displayOrder || 0,
        badgeText: plan.badgeText || '',
        recommended: plan.recommended || false
      });
    } else {
      setEditingPlan(null);
      setFormData({
        planId: '',
        name: 'basic',
        displayName: '',
        description: '',
        price: { amount: 0, currency: 'INR' },
        billingCycle: 'monthly',
        features: [],
        limits: {
          poemsPerDay: null,
          ebooksPerMonth: null,
          audiobooksPerMonth: null,
          unlimited: false,
          creator: false
        },
        isActive: true,
        displayOrder: plans.length,
        badgeText: '',
        recommended: false
      });
    }
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingPlan(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleFeatureChange = (index, field, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, { name: '', included: true, limit: null }]
    }));
  };

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleLimitChange = (limitName, value) => {
    setFormData(prev => ({
      ...prev,
      limits: {
        ...prev.limits,
        [limitName]: value
      }
    }));
  };

  const handleSubmit = async () => {
    try {
      // Prepare the data for submission
      const submitData = {
        ...formData,
        name: formData.name || formData.planId,
        displayOrder: formData.displayOrder || plans.length
      };

      if (editingPlan) {
        await subscriptionAPI.updatePlanCMS(editingPlan._id, submitData);
        toast.success('Plan updated successfully');
      } else {
        await subscriptionAPI.createPlanCMS(submitData);
        toast.success('Plan created successfully');
      }
      handleCloseModal();
      await fetchPlans();
      await fetchStats();
    } catch (error) {
      console.error('Error saving plan:', error);
      toast.error(error.response?.data?.message || 'Error saving plan');
    }
  };

  const handleDeletePlan = async (planId, permanent = false) => {
    if (!window.confirm(`Are you sure you want to ${permanent ? 'permanently delete' : 'deactivate'} this plan?`)) return;
    
    try {
      await subscriptionAPI.deletePlanCMS(planId, permanent);
      toast.success(permanent ? 'Plan permanently deleted' : 'Plan deactivated successfully');
      await fetchPlans();
      await fetchStats();
    } catch (error) {
      console.error('Error deleting plan:', error);
      toast.error(error.response?.data?.message || 'Error deleting plan');
    }
  };

  const handleToggleStatus = async (planId) => {
    try {
      await subscriptionAPI.togglePlanStatusCMS(planId);
      toast.success('Plan status updated');
      await fetchPlans();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error(error.response?.data?.message || 'Error updating status');
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const reorderedPlans = Array.from(plans);
    const [removed] = reorderedPlans.splice(result.source.index, 1);
    reorderedPlans.splice(result.destination.index, 0, removed);

    const orders = reorderedPlans.map((plan, index) => ({
      id: plan._id,
      order: index
    }));

    setPlans(reorderedPlans);
    
    try {
      await subscriptionAPI.reorderPlansCMS(orders);
      toast.success('Plans reordered successfully');
    } catch (error) {
      console.error('Error reordering plans:', error);
      toast.error(error.response?.data?.message || 'Error reordering plans');
      await fetchPlans(); // Revert on error
    }
  };

  const formatPrice = (amount, currency = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Subscription Plans Management</h1>
          <p className="text-gray-500">Manage subscription plans, pricing, and features</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="btn-primary inline-flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Plan</span>
        </button>
      </div>

      {/* Stats Summary */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card p-4 text-center">
            <div className="flex items-center justify-between mb-2">
              <CreditCard className="h-5 w-5 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">{stats.totalPlans || 0}</span>
            </div>
            <p className="text-sm text-gray-500">Total Plans</p>
            <p className="text-xs text-gray-400">{stats.activePlans || 0} Active</p>
          </div>
          <div className="card p-4 text-center">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-5 w-5 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">{stats.activeSubscriptions || 0}</span>
            </div>
            <p className="text-sm text-gray-500">Active Subscriptions</p>
          </div>
          <div className="card p-4 text-center">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-5 w-5 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">{stats.totalUsers || 0}</span>
            </div>
            <p className="text-sm text-gray-500">Total Users</p>
          </div>
          <div className="card p-4 text-center">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-5 w-5 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(stats.revenue?.totalMonthlyRevenue || 0)}
              </span>
            </div>
            <p className="text-sm text-gray-500">Monthly Revenue</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-1 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('plans')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'plans'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Plans Management
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'analytics'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Statistics & Analytics
        </button>
      </div>

      {/* Plans Management Tab */}
      {activeTab === 'plans' && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Display Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Billing Cycle</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommended</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscribers</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <Droppable droppableId="plans">
                {(provided) => (
                  <tbody {...provided.droppableProps} ref={provided.innerRef}>
                    {plans.map((plan, index) => (
                      <Draggable key={plan._id} draggableId={plan._id} index={index}>
                        {(provided) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="border-b border-gray-200 hover:bg-gray-50"
                          >
                            <td className="px-6 py-4" {...provided.dragHandleProps}>
                              <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">{plan.planId}</td>
                            <td className="px-6 py-4">
                              <span className="text-sm font-medium text-gray-900">{plan.displayName}</span>
                              {plan.badgeText && (
                                <span className="ml-2 inline-flex px-2 py-0.5 text-xs rounded-full bg-primary-100 text-primary-700">
                                  {plan.badgeText}
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {formatPrice(plan.price?.amount || 0, plan.price?.currency || 'INR')}/{plan.billingCycle === 'yearly' ? 'yr' : plan.billingCycle === 'quarterly' ? 'qtr' : 'mo'}
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700 capitalize">
                                {plan.billingCycle}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => handleToggleStatus(plan._id)}
                                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors ${
                                  plan.isActive 
                                    ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                }`}
                              >
                                {plan.isActive ? 'Active' : 'Inactive'}
                              </button>
                            </td>
                            <td className="px-6 py-4">
                              {plan.recommended && (
                                <span className="inline-flex px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-700">
                                  Recommended
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {plan.subscriberCount || 0}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <button
                                  onClick={() => handleOpenModal(plan)}
                                  className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600"
                                  title="Edit Plan"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeletePlan(plan._id, false)}
                                  className="p-1.5 rounded-lg hover:bg-gray-100 text-red-600"
                                  title="Delete Plan"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tbody>
                )}
              </Droppable>
            </table>
          </div>
        </DragDropContext>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && stats?.planDistribution && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.planDistribution.map((dist) => (
            <div key={dist._id} className="card p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 capitalize mb-2">{dist._id}</h3>
              <p className="text-3xl font-bold text-primary-600">{dist.count}</p>
              <p className="text-sm text-gray-500 mt-1">Subscribers</p>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Plan Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingPlan ? 'Edit Plan' : 'Add New Plan'}
                </h2>
                <button onClick={handleCloseModal} className="p-2 rounded-lg hover:bg-gray-100">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Plan ID</label>
                    <input
                      type="text"
                      name="planId"
                      value={formData.planId}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="free, basic, premium, pro"
                      disabled={!!editingPlan}
                    />
                    <p className="text-xs text-gray-500 mt-1">Must be unique identifier</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                    <input
                      type="text"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="Free, Basic, Premium, Pro"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="input-field h-24"
                    placeholder="Describe the plan..."
                  />
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Amount</label>
                    <input
                      type="number"
                      name="price.amount"
                      value={formData.price.amount}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                    <select
                      name="price.currency"
                      value={formData.price.currency}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="INR">INR</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Billing Cycle</label>
                    <select
                      name="billingCycle"
                      value={formData.billingCycle}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                </div>

                {/* Badge */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Badge Text (Optional)</label>
                  <input
                    type="text"
                    name="badgeText"
                    value={formData.badgeText}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="e.g., Most Popular, Best Value"
                  />
                </div>

                {/* Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                  <div className="space-y-2">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={feature.name}
                          onChange={(e) => handleFeatureChange(index, 'name', e.target.value)}
                          className="input-field flex-1"
                          placeholder="Feature name"
                        />
                        <label className="flex items-center gap-1">
                          <input
                            type="checkbox"
                            checked={feature.included}
                            onChange={(e) => handleFeatureChange(index, 'included', e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-primary-600"
                          />
                          <span className="text-sm text-gray-600">Included</span>
                        </label>
                        <input
                          type="number"
                          value={feature.limit || ''}
                          onChange={(e) => handleFeatureChange(index, 'limit', e.target.value ? Number(e.target.value) : null)}
                          className="input-field w-24"
                          placeholder="Limit"
                        />
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addFeature}
                      className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" /> Add Feature
                    </button>
                  </div>
                </div>

                {/* Limits */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Usage Limits</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Poems Per Day</label>
                      <input
                        type="number"
                        value={formData.limits.poemsPerDay || ''}
                        onChange={(e) => handleLimitChange('poemsPerDay', e.target.value ? Number(e.target.value) : null)}
                        className="input-field"
                        placeholder="Unlimited"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Ebooks Per Month</label>
                      <input
                        type="number"
                        value={formData.limits.ebooksPerMonth || ''}
                        onChange={(e) => handleLimitChange('ebooksPerMonth', e.target.value ? Number(e.target.value) : null)}
                        className="input-field"
                        placeholder="Unlimited"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Audiobooks Per Month</label>
                      <input
                        type="number"
                        value={formData.limits.audiobooksPerMonth || ''}
                        onChange={(e) => handleLimitChange('audiobooksPerMonth', e.target.value ? Number(e.target.value) : null)}
                        className="input-field"
                        placeholder="Unlimited"
                      />
                    </div>
                    <div className="flex items-center gap-4 pt-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.limits.unlimited}
                          onChange={(e) => handleLimitChange('unlimited', e.target.checked)}
                          className="h-4 w-4 rounded border-gray-300 text-primary-600"
                        />
                        <span className="text-sm text-gray-700">Unlimited Access</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.limits.creator}
                          onChange={(e) => handleLimitChange('creator', e.target.checked)}
                          className="h-4 w-4 rounded border-gray-300 text-primary-600"
                        />
                        <span className="text-sm text-gray-700">Creator Tools</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="recommended"
                      checked={formData.recommended}
                      onChange={handleInputChange}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600"
                    />
                    <span className="text-sm text-gray-700">Mark as Recommended Plan</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600"
                    />
                    <span className="text-sm text-gray-700">Active</span>
                  </label>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleSubmit}
                    className="btn-primary flex-1"
                  >
                    {editingPlan ? 'Update Plan' : 'Create Plan'}
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2.5 text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubscriptionCMSPage;