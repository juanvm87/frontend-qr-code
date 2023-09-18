import React, { useState } from 'react';
import { TextField, Button, Container, CssBaseline } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { makeStyles } from '@mui/styles'; // Import makeStyles from @mui/styles
import './ResetPassword.css'; // Import your custom CSS for styling

// Define custom styles using makeStyles
const useStyles = makeStyles((theme) => ({
    resetFormContainer: {
        textAlign: 'left', // Align content to the left
    },
}));

const ResetPassword = () => {
    const classes = useStyles(); // Apply the custom styles

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleReset = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your password change logic here
        if (newPassword === confirmPassword) {
            // Passwords match, proceed with password change
            console.log("Password changed successfully!");
        } else {
            console.log("Passwords do not match!");
        }
    };

    return (
        <Container component="main" maxWidth="xs" className="reset-password-container">
            <CssBaseline />
            <div className={`${classes.resetFormContainer}`}>
                <h1>Reset Password</h1>
                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Current Password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="New Password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Re-enter New Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <div className="button-container">
                        <Button type="button" onClick={handleReset} variant="contained" color="warning" className="reset-button">
                            Reset
                        </Button>
                        <Button type="submit" variant="contained" color="success" className="submit-button">
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </Container>
    );
};

export default ResetPassword;
