import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Pagination,
  CircularProgress,
  Alert,
  Button
} from '@mui/material';
import { Search as SearchIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { adminPaymentsAPI } from "../adminController";

export default function TransferHistory() {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: '',
    status: ''
  });
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1
  });

  // Fetch all manual transfers
  const fetchTransfers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await adminPaymentsAPI.getAllManualTransfers(filters);
      setTransfers(response.data.data || []);
      setPagination(response.data.pagination || {
        totalItems: response.data.total || 0,
        totalPages: Math.ceil((response.data.total || 0) / filters.limit),
        currentPage: filters.page
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch transfers');
      console.error('Error fetching transfers:', err);
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    fetchTransfers();
  }, [filters.page, filters.status]);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Handle filter changes
  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const handleStatusChange = (e) => {
    setFilters({ ...filters, status: e.target.value, page: 1 });
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      fetchTransfers();
    }
  };

  const handlePageChange = (event, page) => {
    setFilters({ ...filters, page });
  };

  // Status chip color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manual Transfer History
      </Typography>

      

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search by reference, client name..."
            variant="outlined"
            size="small"
            value={filters.search}
            onChange={handleSearchChange}
            onKeyPress={handleSearchSubmit}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />
            }}
            sx={{ minWidth: 300 }}
          />
          
          {/* <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status}
              label="Status"
              onChange={handleStatusChange}
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl> */}

          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchTransfers}
            disabled={loading}
          >
            Refresh
          </Button>
        </Box>
      </Paper>

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Transfer Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Reference</strong></TableCell>
                  <TableCell><strong>Client</strong></TableCell>
                  <TableCell><strong>Booking ID</strong></TableCell>
                  <TableCell><strong>Amount</strong></TableCell>
                  <TableCell><strong>Transfer Amount</strong></TableCell>
                  <TableCell><strong>Date</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>UTR</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transfers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No transfers found
                    </TableCell>
                  </TableRow>
                ) : (
                  transfers.map((transfer) => (
                    <TableRow key={transfer._id} hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          {transfer.transactionReference}
                        </Typography>
                      </TableCell>
                      <TableCell>{transfer.clientName}</TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                          {transfer.bookingId?.slice(-8) || 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight="bold">
                          {formatCurrency(transfer.originalAmount)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="success.main" fontWeight="bold">
                          {formatCurrency(transfer.transferAmount)}
                        </Typography>
                      </TableCell>
                      <TableCell>{formatDate(transfer.createdAt)}</TableCell>
                      <TableCell>
                        <Chip 
                          label={transfer.status} 
                          color={getStatusColor(transfer.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          {transfer.utrNumber || 'N/A'}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Pagination
                count={pagination.totalPages}
                page={filters.page}
                onChange={handlePageChange}
                color="primary"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}