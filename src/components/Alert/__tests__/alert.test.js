import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CustomizedAlert from '../alert';

describe('CustomizedAlert', () => {
    const onCloseMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders alert component when open is true', () => {
        render(
            <CustomizedAlert
                onClose={onCloseMock}
                open={true}
                message="Test message"
                severity="success"
                style={{}}
            />
        );

        expect(screen.getByTestId('customized-snackbar')).toBeInTheDocument();
        expect(screen.getByTestId('customized-alert')).toBeInTheDocument();
    });

    test('does not render alert component when open is false', () => {
        render(
            <CustomizedAlert
                onClose={onCloseMock}
                open={false}
                message="Test message"
                severity="success"
                style={{}}
            />
        );

        expect(screen.queryByTestId('customized-snackbar')).not.toBeInTheDocument();
        expect(screen.queryByTestId('customized-alert')).not.toBeInTheDocument();
    });

    test('calls onClose function when the alert is closed', () => {
        render(
            <CustomizedAlert
                onClose={onCloseMock}
                open={true}
                message="Test message"
                severity="success"
                style={{}}
            />
        );

        fireEvent.click(screen.getByRole('button', { name: /close/i }));
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    test('displays the correct message', () => {
        render(
            <CustomizedAlert
                onClose={onCloseMock}
                open={true}
                message="Test message"
                severity="success"
                style={{}}
            />
        );

        expect(screen.getByText(/test message/i)).toBeInTheDocument();
    });

    test('displays the correct severity', () => {
        const { container } = render(
            <CustomizedAlert
                onClose={onCloseMock}
                open={true}
                message="Test message"
                severity="error"
                style={{}}
            />
        );

        expect(container.querySelector('.MuiAlert-filledError')).toBeInTheDocument();
    });

    test('applies custom styles', () => {
        render(
            <CustomizedAlert
                onClose={onCloseMock}
                open={true}
                message="Test message"
                severity="success"
                style={{ backgroundColor: 'red' }}
            />
        );

        expect(screen.getByTestId('customized-alert')).toHaveStyle('background-color: red');
    });
});
