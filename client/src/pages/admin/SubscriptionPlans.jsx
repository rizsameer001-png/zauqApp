//
import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Check as CheckIcon,
  Close as CloseIcon,
  Star as StarIcon
} from '@mui/icons-material';
import axios from 'axios';

const SubscriptionPlans = ({ onSelectPlan }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get('/api/cms/subscriptions/public/plans');
      setPlans(response.data.data);
    } catch (error) {
      setError('Failed to load subscription plans');
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box m={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" align="center" gutterBottom>
        Choose Your Plan
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" mb={4}>
        Select the perfect plan for your literary journey
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {plans.map((plan) => (
          <Grid item xs={12} sm={6} md={3} key={plan.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6
                },
                ...(plan.recommended && {
                  border: '2px solid',
                  borderColor: 'warning.main'
                })
              }}
            >
              {plan.recommended && (
                <Chip
                  icon={<StarIcon />}
                  label="Recommended"
                  color="warning"
                  sx={{
                    position: 'absolute',
                    top: -12,
                    right: 16,
                    zIndex: 1
                  }}
                />
              )}
              
              {plan.badgeText && (
                <Chip
                  label={plan.badgeText}
                  color="primary"
                  sx={{
                    position: 'absolute',
                    top: -12,
                    left: 16,
                    zIndex: 1
                  }}
                />
              )}

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {plan.name}
                </Typography>
                
                <Box display="flex" alignItems="baseline" mb={2}>
                  <Typography variant="h3" component="span">
                    ₹{plan.price}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    /{plan.billingCycle === 'yearly' ? 'year' : plan.billingCycle === 'quarterly' ? 'quarter' : 'month'}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <List dense>
                  {plan.features.map((feature, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                  
                  {plan.limits.unlimited && (
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Unlimited access to all content" />
                    </ListItem>
                  )}
                  
                  {plan.limits.creator && (
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Creator tools & analytics" />
                    </ListItem>
                  )}
                </List>
              </CardContent>

              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  fullWidth
                  variant={plan.recommended ? "contained" : "outlined"}
                  color={plan.price === 0 ? "secondary" : "primary"}
                  onClick={() => onSelectPlan(plan)}
                  size="large"
                >
                  {plan.price === 0 ? 'Get Started' : 'Subscribe Now'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SubscriptionPlans;