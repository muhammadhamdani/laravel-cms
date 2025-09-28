import { Button } from '@/components/ui/button';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { X } from 'lucide-react';
import { Fragment, ReactNode } from 'react';

interface DrawerProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    side?: 'left' | 'right';
}

export function Drawer({ open, onClose, title, children, side = 'left' }: DrawerProps) {
    const fromClass = side === 'left' ? '-translate-x-full' : 'translate-x-full';
    const toClass = 'translate-x-0';
    const justifyClass = side === 'left' ? 'justify-start' : 'justify-end';

    return (
        <Transition show={open} as={Fragment}>
            <Dialog as="div" className="relative z-[9999]" onClose={onClose}>
                {/* Backdrop */}
                <TransitionChild
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-900/80" aria-hidden="true" />
                </TransitionChild>

                {/* Panel */}
                <div className={`fixed inset-0 flex ${justifyClass}`}>
                    <TransitionChild
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom={fromClass}
                        enterTo={toClass}
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom={toClass}
                        leaveTo={fromClass}
                    >
                        <DialogPanel className="relative flex w-1/2 flex-col bg-white p-4 shadow-xl">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-lg font-semibold">{title ?? 'Menu'}</h2>
                                <Button variant="ghost" size="icon" onClick={onClose}>
                                    <X className="h-6 w-6" />
                                </Button>
                            </div>
                            <div className="flex-1 overflow-y-auto">{children}</div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    );
}
