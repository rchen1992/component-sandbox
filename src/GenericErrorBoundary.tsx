import * as React from 'react';

interface IGenericErrorBoundaryProps {
    errorMessage?: string;
}

interface IGenericErrorBoundaryState {
    error: Error | undefined;
}

class GenericErrorBoundary extends React.Component<
    IGenericErrorBoundaryProps,
    IGenericErrorBoundaryState
> {
    constructor(props: IGenericErrorBoundaryProps) {
        super(props);
        this.state = { error: undefined };
    }

    static getDerivedStateFromError(error: Error) {
        return { error };
    }

    render() {
        if (this.state.error) {
            const error = this.props.errorMessage || this.state.error.message;
            return <h1>{error}</h1>;
        }

        return this.props.children;
    }
}

export default GenericErrorBoundary;
