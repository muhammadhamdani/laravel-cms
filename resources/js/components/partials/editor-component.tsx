import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import { EditorContent, type Extension, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import classNames from 'classnames';
import { InfoIcon } from 'lucide-react';
import { useEffect } from 'react';
import { Label } from '../ui/label';
import { TipTapFloatingMenu } from '../ui/tiptap/extensions/floating-menu';
import { FloatingToolbar } from '../ui/tiptap/extensions/floating-toolbar';
import { ImageExtension } from '../ui/tiptap/extensions/image';
import { ImagePlaceholder } from '../ui/tiptap/extensions/image-placeholder';
import SearchAndReplace from '../ui/tiptap/extensions/search-and-replace';
import '../ui/tiptap/tiptap.css';
import { EditorToolbar } from '../ui/tiptap/toolbars/editor-toolbar';

const extensions = [
    StarterKit.configure({
        orderedList: {
            HTMLAttributes: {
                class: 'list-decimal',
            },
        },
        bulletList: {
            HTMLAttributes: {
                class: 'list-disc',
            },
        },
        heading: {
            levels: [1, 2, 3, 4],
        },
    }),
    Placeholder.configure({
        emptyNodeClass: 'is-editor-empty',
        placeholder: ({ node }) => {
            switch (node.type.name) {
                case 'heading':
                    return `Heading ${node.attrs.level}`;
                case 'detailsSummary':
                    return 'Section title';
                case 'codeBlock':
                    // never show the placeholder when editing code
                    return '';
                default:
                    return "Write, type '/' for commands";
            }
        },
        includeChildren: false,
    }),
    TextAlign.configure({
        types: ['heading', 'paragraph'],
    }),
    TextStyle,
    Subscript,
    Superscript,
    Underline,
    Link,
    Color,
    Highlight.configure({
        multicolor: true,
    }),
    ImageExtension,
    ImagePlaceholder,
    SearchAndReplace,
    Typography,
];

interface EditorProps {
    label?: string;
    className?: string;
    value: string;
    errors?: any;
    helperText?: string;
    handleOnChange: (value: string) => void;
}

export const EditorComponent = ({ label, className, value = '', errors, helperText, handleOnChange }: EditorProps) => {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: extensions as Extension[],
        content: value,
        editorProps: {
            attributes: {
                class: 'max-w-full focus:outline-none',
            },
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            handleOnChange?.(html);
        },
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value, false); // false = tidak fokuskan ulang cursor
        }
    }, [value, editor]);

    if (!editor) return null;

    return (
        <div className="flex flex-col space-y-4">
            {label && <Label>{label}</Label>}
            <div
                className={classNames(
                    'bg-card relative max-h-[calc(100dvh-6rem)] w-full overflow-hidden overflow-y-scroll border pb-[60px] sm:pb-0',
                    className,
                )}
            >
                <EditorToolbar editor={editor} />
                <FloatingToolbar editor={editor} />
                <TipTapFloatingMenu editor={editor} />
                <EditorContent editor={editor} className="min-h-[600px] w-full min-w-full cursor-text sm:p-6" />
            </div>
            {helperText && (
                <div className={classNames('flex items-center space-x-2 text-xs', errors && 'text-red-500')}>
                    <InfoIcon className={classNames('h-4 w-4', errors ? 'text-red-500' : 'text-yellow-500')} />
                    <span>{helperText}</span>
                </div>
            )}
        </div>
    );
};
