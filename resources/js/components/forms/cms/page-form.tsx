import { ButtonComponent } from '@/components/partials/button-component';
import { EditorComponent } from '@/components/partials/editor-component';
import InputTextComponent from '@/components/partials/input-components';
import { Label } from '@/components/ui/label';
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/shadcn-io/dropzone';
import { useForm, usePage } from '@inertiajs/react';
import { SaveIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';

export const PageForm = ({ dataId }: { dataId?: number }) => {
    const { page, categories, ziggy } = usePage<any>().props;

    const { data, setData, post, put, processing, errors, reset, transform }: any = useForm({
        saveBack: 'false',
        name: page?.name || '',
        description: page?.description || '',
        status: page?.status || null,
        image: page?.image || null,
        previewImage: null,
        _method: dataId ? 'PUT' : 'POST',
    });

    const [files, setFiles] = useState<File[]>([]);

    // transformData
    // transform((data: any) => ({
    //     ...data,
    // }));

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (dataId) {
            post(route('pages.update', dataId), {
                forceFormData: true,
            });
        } else {
            post(route('pages.store'), {
                forceFormData: true,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col space-y-4">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 flex flex-col space-y-6 rounded p-4 md:col-span-9">
                    <InputTextComponent
                        type="text"
                        label="Title"
                        name="title"
                        value={data.name}
                        handleOnChange={(value: string) => setData('name', value)}
                        errors={errors?.name}
                        helperText={errors?.name}
                    />
                    <EditorComponent
                        label="Description"
                        value={data.description}
                        handleOnChange={(value: string) => setData('description', value)}
                        errors={errors?.description}
                        helperText={errors?.description}
                    />
                </div>
                <div className="col-span-12 flex flex-col space-y-4 rounded p-4 md:col-span-3">
                    <div className="flex flex-col space-y-2 rounded border p-4">
                        <div className="flex justify-end space-x-4">
                            <ButtonComponent
                                buttonText="Save"
                                addonLeft={SaveIcon}
                                buttonType="submit"
                                isProcessing={processing}
                                onClick={() => setData('saveBack', 'true')}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-6 rounded border p-4">
                        <Label>Feature Image</Label>
                        <Dropzone
                            accept={{ 'image/*': [] }}
                            onDrop={(acceptedFiles: File[]) => {
                                setFiles(acceptedFiles);
                                setData('image', acceptedFiles[0]);
                                setData('previewImage', URL.createObjectURL(acceptedFiles[0]));
                            }}
                            onError={console.error}
                        >
                            <DropzoneEmptyState />
                            <DropzoneContent />
                        </Dropzone>

                        {/* Jika ada preview dari upload baru */}
                        {data.previewImage && <img src={data.previewImage} alt="Preview Feature Image" className="w-full rounded object-cover" />}

                        {/* Jika tidak ada preview baru tapi ada image lama */}
                        {!data.previewImage && data.image && (
                            <img src={`${ziggy.url}/storage/${data.image}`} alt="Feature Image" className="w-full rounded object-cover" />
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
};
