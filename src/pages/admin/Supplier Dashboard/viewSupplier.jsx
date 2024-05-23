import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import "./viewSupplier.css";
import { Modal } from "@mui/material";
import AddSupplier from "./Modals/AddSupplier/addSupplier";
import InventoryNavbar from "../../../layout/navbar/Inventory navbar/Inventory navbar";
import Footer from "../../../layout/footer/footer";
import CustomizedButton from "../../../components/Button/button";
import SearchBar from "../../../components/search bar/search bar";
import ComboBox from "../../../components/Form Inputs/comboBox";
import CustomizedTable from "../../../components/Table/Customized Table/customizedTable";
import axios from "axios";
import CustomizedAlert from "../../../components/Alert/alert";
import PageLoader from "../../../components/Page Loader/pageLoader";

function FilterItems() {
    const [category, setCategory] = useState('');

    const handleSelect = (event) => {
        setCategory(event.target.value);
    };

    const options = [
        { value: 'All', label: 'All' },
        { value: 'Metal', label: 'Metal' },
        { value: 'Wood', label: 'Wood' }
    ];

    return (
        <Box sx={{ minWidth: 80 }}>
            <FormControl fullWidth>
                <InputLabel
                    id="demo-simple-select-label"
                    sx={{
                        fontSize: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'rgba(255,255,255,0.7)'
                    }}
                >
                    Select
                </InputLabel>
                <ComboBox
                    value={category}
                    onChange={(event) => handleSelect(event)}
                    style={{ width: '10em', marginRight: '0.5em', border: '1px solid white' }}
                    options={options}
                    label="Category"
                    size="small"
                />
            </FormControl>
        </Box>
    );
}

function ViewSupplier() {
    const [visible, setVisible] = useState(false);
    const [suppliers, setSuppliers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    const handleClickSuccess = () => {
        setOpenSuccess(true);
    };

    const handleClickError = () => {
        setOpenError(true);
    };

    const handleCloseSuccess = () => {
        setOpenSuccess(false);
    };

    const handleCloseError = () => {
        setOpenError(false);
    };

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchSuppliers = async () => {
            if (!token) {
                console.error('No access token found');
                return;
            }
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:9000/supplier/getAllSuppliers', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSuppliers(response.data);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.error('Unauthorized access - perhaps the token is invalid or expired');
                } else {
                    console.error('Error fetching suppliers:', error);
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchSuppliers();
    }, []);

    const handleButtonClick = async (id) => {
        try {
            if (!token) {
                console.error('No access token found');
                return;
            }
            await axios.delete(`http://localhost:9000/supplier/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Fetching the updated list of discounts after deletion
            const response = await axios.get('http://localhost:9000/supplier/getAllSuppliers', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSuppliers(response.data);
            handleClickSuccess();

        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized access - perhaps the token is invalid or expired');
            } else {
                console.error('Error canceling discount:', error);
            }
            handleClickError();
        }
    };

    // Fetch supplier function with query parameter
    const fetchSuppliersWithQuery = async (query) => {
        try {
            if (!token) {
                console.error('No access token found');
                return;
            }
            const response = await axios.get(`http://localhost:9000/supplier/search?keyword=${query}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSuppliers(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized access - perhaps the token is invalid or expired');
            } else {
                console.error('Error fetching suppliers:', error);
            }
            handleClickError();
        }
    };

    const columns = [
        { columnId: 'id', label: 'Supplier Id', minWidth: 100, align: 'center' },
        { columnId: 'supplierName', label: 'Supplier Name', minWidth: 150, align: 'center' },
        { columnId: 'supplierEmail', label: 'E-mail', minWidth: 120, align: 'center' },
        { columnId: 'nic', label: 'NIC', minWidth: 100, align: 'center' },
        { columnId: 'supplierAddress', label: 'Address', minWidth: 170, align: 'center' },
        { columnId: 'supplierContact', label: 'Contact No.', minWidth: 100, align: 'center' },
        { columnId: 'actions', label: '', minWidth: 100, align: 'center' },
    ];

    const mappedData = suppliers.map(row => ({
        ...row,
        actions: createViewButton(row.id)
    }));

    function createViewButton(rowId) {
        return (
            <CustomizedButton
                onClick={() => handleButtonClick(rowId)}
                hoverBackgroundColor="#f11717"
                style={{
                    backgroundColor: '#960505',
                    width: '9.5em',
                    height: '2.5em',
                    fontSize: '0.75em',
                    padding: '0.5em 0.625em',
                    borderRadius: '0.35em',
                    fontWeight: '550',
                }}
            >
                Delete
            </CustomizedButton>
        );
    }

    const handleSupplierAdded = (updatedSuppliers) => {
        setSuppliers(updatedSuppliers);
    };

    return (
        <>
            <InventoryNavbar />

            <div className="viewSupplierOuter">
                <div className="viewSupplierFilter">
                    <div className="filterHeader">
                        <h2>Filter Items</h2>
                        <div className="supplierCategoryFilter">
                            <div className="itemCategoryTopic">
                                <h5>Category</h5>
                            </div>
                            <FilterItems />
                        </div>
                        <div className="applyButton">
                            <CustomizedButton
                                hoverBackgroundColor="#f11717"
                                style={{
                                    backgroundColor: '#960505',
                                    width: '11em',
                                    height: '2.5em',
                                    fontSize: '0.95em',
                                    padding: '0.5em 0.625em',
                                    borderRadius: '0.35em',
                                    fontWeight: '550',
                                    marginTop: '0.625em',
                                    marginRight: '1.5em',
                                    marginLeft: '1.5em'
                                }}
                            >
                                Apply
                            </CustomizedButton>
                        </div>
                    </div>
                </div>
                <div className="viewSupplierInner">

                    <div className="supplierSearchAndButtons">
                        <div className="viewSupplierSearch">
                            <SearchBar
                                label="Search Supplier"
                                onKeyPress={fetchSuppliersWithQuery}
                            />
                        </div>
                        <div className="viewSupplierButtons">
                            <CustomizedButton
                                onClick={() => setVisible(true)}
                                hoverBackgroundColor="#2d3ed2"
                                style={{
                                    backgroundColor: '#242F9B',
                                    border: '1px solid #242F9B',
                                    width: '9.5em',
                                    height: '2.5em',
                                    fontSize: '0.75em',
                                    padding: '0.5em 0.625em',
                                    borderRadius: '0.35em',
                                    fontWeight: '550',
                                }}
                            >
                                Add Supplier
                            </CustomizedButton>
                        </div>
                    </div>

                    <div className="itemTable">
                        {isLoading ? (
                            <PageLoader />
                        ) : (
                            <CustomizedTable
                                columns={columns}
                                rows={mappedData}
                                style={{ width: '90%' }}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Model */}
            <Modal open={visible}>
                <AddSupplier
                    onClose={() => setVisible(false)}
                    onSupplierAdded={handleSupplierAdded}
                />
            </Modal>

            {/* Alerts */}
            <CustomizedAlert
                open={openSuccess}
                onClose={handleCloseSuccess}
                severity="success"
                message="Supplier action completed successfully!"
            />

            <CustomizedAlert
                open={openError}
                onClose={handleCloseError}
                severity="error"
                message="Something went wrong!"
            />

            <Footer />
        </>
    );
}

export default ViewSupplier;
