import React, {useEffect, useState} from 'react';
import logo from '../image/cue_logo.png';
import { IconButton, InputAdornment, TextField, Badge, Menu, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useNavigate} from "react-router-dom";

const Nav = () => {
    const [query, setQuery] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        if (sessionStorage.getItem('loginState')==='ok'){
            setIsLoggedIn(true);
        }
        else {
            setIsLoggedIn(false);
        }
    },isLoggedIn)
    const handleSearch = () => {
        console.log('Search query:', query);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLoginClick = () => {
        navigate("/login")
    }
    const handleLogoutClick = () => {
        sessionStorage.setItem("loginState","no");
        setIsLoggedIn(false);
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '4rem', backgroundColor: '#e7e7e7', alignItems: 'center', position: 'sticky', top: '0', zIndex: 1000 }}>
            <img src={logo} alt="Logo" style={{ height: '80%', marginLeft: '1rem' }} />
            <TextField
                variant="outlined"
                placeholder="Tìm kiếm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleSearch}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                style={{ width: '20rem', marginLeft: '2rem', backgroundColor: '#fff', borderRadius: '4px' }}
            />
            <div style={{ marginLeft: 'auto', marginRight: '2rem', display: 'flex', alignItems: 'center', gap:"1rem" }}>
                <IconButton color="inherit">
                    <Badge badgeContent={0} color="secondary">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
                <IconButton color="inherit" onClick={handleMenuOpen}>
                    <AccountCircleIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    {isLoggedIn ? (
                        <MenuItem onClick={handleLogoutClick}>Đăng xuất</MenuItem>
                    ) : (
                        <>
                            <MenuItem onClick={handleLoginClick}>Đăng nhập</MenuItem>
                            <MenuItem onClick={handleMenuClose}>Đăng ký</MenuItem>
                        </>
                    )}
                </Menu>
            </div>
        </div>
    );
};

export default Nav;
