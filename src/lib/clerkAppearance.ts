// Typed structurally by its consumer (<ClerkProvider appearance={…}>). Clerk does
// not re-export the `Appearance` type from @clerk/clerk-react in this version.
export const clerkAppearance = {
  variables: {
    colorPrimary: '#1D1D1F',
    colorBackground: '#FFFFFF',
    colorText: '#1D1D1F',
    colorTextSecondary: '#6E6E73',
    colorInputBackground: '#FFFFFF',
    colorInputText: '#1D1D1F',
    colorNeutral: '#1D1D1F',
    borderRadius: '10px',
    fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
    fontSize: '14px',
  },
  elements: {
    card: {
      boxShadow: 'none',
      border: '1px solid #D2D2D7',
      borderRadius: '14px',
      padding: '32px',
    },
    headerTitle: { display: 'none' },
    headerSubtitle: { display: 'none' },
    socialButtonsBlockButton: {
      border: '1px solid #D2D2D7',
      borderRadius: '8px',
      color: '#1D1D1F',
      fontWeight: '500',
    },
    formButtonPrimary: {
      backgroundColor: '#1D1D1F',
      borderRadius: '8px',
      fontSize: '13px',
      fontWeight: '600',
    },
    formFieldInput: {
      borderRadius: '8px',
      border: '1px solid #D2D2D7',
      fontSize: '14px',
    },
    footerActionLink: {
      color: '#2563EB',
      fontWeight: '500',
    },
    identityPreviewEditButton: { color: '#2563EB' },
    formFieldLabel: { color: '#1D1D1F', fontWeight: '500' },
    dividerLine: { background: '#D2D2D7' },
    dividerText: { color: '#86868B' },
  },
}
