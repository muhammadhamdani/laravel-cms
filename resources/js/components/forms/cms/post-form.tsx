import { ButtonComponent } from '@/components/partials/button-component';
import { EditorComponent } from '@/components/partials/editor-component';
import InputTextComponent from '@/components/partials/input-components';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/shadcn-io/dropzone';
import { useForm, usePage } from '@inertiajs/react';
import { SaveIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';

export const PostForm = ({ dataId }: { dataId?: number }) => {
    const { post: artikel, categories, ziggy } = usePage<any>().props;

    const [files, setFiles] = useState<File[]>([]);
    const [tagInput, setTagInput] = useState('');

    const { data, setData, post, put, processing, errors, reset, transform }: any = useForm({
        saveBack: 'false',
        title: artikel?.title || '',
        description: artikel?.description || '',
        category_id: artikel?.categories?.map((c: any) => Number(c.id)) || [],
        tag_name: artikel?.tags?.map((t: any) => t.name) || [],
        status: artikel?.status.toString() || null,
        image: artikel?.image || null,
        previewImage: null, // blob url untuk preview upload baru
        _method: dataId ? 'PUT' : 'POST',
    });

    // transformData
    // transform((data: any) => ({
    //     ...data,
    // }));

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (dataId) {
            post(route('posts.update', dataId), {
                forceFormData: true,
            });
        } else {
            post(route('posts.store'), {
                forceFormData: true,
            });
        }
    };

    const addTag = (tagName: string) => {
        if (!data.tag_name.includes(tagName)) {
            setData('tag_name', [...data.tag_name, tagName]);
        }
    };

    const removeTag = (tagName: string) => {
        setData(
            'tag_name',
            data.tag_name.filter((t: string) => t !== tagName),
        );
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col space-y-4">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 flex flex-col space-y-6 rounded p-4 md:col-span-9">
                    <InputTextComponent
                        type="text"
                        label="Title"
                        name="title"
                        value={data.title}
                        handleOnChange={(value: string) => setData('title', value)}
                        errors={errors?.title}
                        helperText={errors?.title}
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
                        <Label>Select Categories</Label>
                        <div className="flex h-32 flex-col space-y-3 overflow-y-auto">
                            {categories?.map((category: any) => {
                                const catId = Number(category.id); // pastikan number
                                const isChecked = data.category_id.includes(catId);

                                return (
                                    <div key={catId} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`cat-${catId}`}
                                            checked={isChecked}
                                            onCheckedChange={(checked) => {
                                                if (checked) {
                                                    setData('category_id', [...data.category_id, catId]);
                                                } else {
                                                    setData(
                                                        'category_id',
                                                        data.category_id.filter((id: number) => id !== catId),
                                                    );
                                                }
                                            }}
                                        />
                                        <Label htmlFor={`cat-${catId}`}>{category.name}</Label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex flex-col space-y-6 rounded border p-4">
                        <Label>Tags</Label>
                        <div className="flex space-x-2">
                            <Input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                placeholder="Add a tag"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && tagInput.trim()) {
                                        e.preventDefault();
                                        addTag(tagInput.trim());
                                        setTagInput('');
                                    }
                                }}
                            />
                            <Button
                                type="button"
                                onClick={() => {
                                    addTag(tagInput.trim());
                                    setTagInput('');
                                }}
                            >
                                Add
                            </Button>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-2">
                            {data.tag_name.map((tag: string, index: number) => (
                                <div key={index} className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-sm text-green-800">
                                    {tag}
                                    <button type="button" onClick={() => removeTag(tag)} className="ml-1 font-bold">
                                        &times;
                                    </button>
                                </div>
                            ))}
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
