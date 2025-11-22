declare module '@phosphor-icons/react' {
    import { ComponentProps, ElementType, Ref } from 'react';

    export interface IconProps extends ComponentProps<'svg'> {
        size?: string | number;
        weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
        color?: string;
        mirrored?: boolean;
        alt?: string;
    }

    export type Icon = ElementType<IconProps>;

    export const Warning: Icon;
    export const Info: Icon;
    export const Bug: Icon;
    export const FileText: Icon;
    export const MagnifyingGlass: Icon;
    export const X: Icon;
    export const Funnel: Icon;
    export const UploadSimple: Icon;
    export const Copy: Icon;
    export const BookOpen: Icon;
    export const Download: Icon;
    export const CaretRight: Icon;
    export const Check: Icon;
    export const Spinner: Icon;
    // Add other icons as needed
}

declare module 'sonner' {
    export const toast: {
        success: (message: string) => void;
        error: (message: string) => void;
        info: (message: string) => void;
        warning: (message: string) => void;
        (message: string): void;
    };
    export const Toaster: React.FC<any>;
}

declare module 'recharts' {
    export const LineChart: any;
    export const Line: any;
    export const XAxis: any;
    export const YAxis: any;
    export const CartesianGrid: any;
    export const Tooltip: any;
    export const Legend: any;
    export const ResponsiveContainer: any;
}

declare module 'class-variance-authority' {
    export function cva(base?: string, config?: any): (props?: any) => string;
    export type VariantProps<T> = any;
}

declare module '@radix-ui/react-slot' {
    export const Slot: React.FC<any>;
}
