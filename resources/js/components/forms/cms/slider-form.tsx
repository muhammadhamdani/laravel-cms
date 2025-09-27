import { ButtonComponent } from '@/components/partials/button-component';
import InputTextComponent, { InputFileComponent } from '@/components/partials/input-components';
import { useForm, usePage } from '@inertiajs/react';
import { SaveIcon } from 'lucide-react';
import { FormEvent } from 'react';

export const SliderForm = ({ dataId }: { dataId?: number }) => {
    const { slider } = usePage<any>().props;

    const { data, setData, post, put, processing, errors, reset, transform }: any = useForm({
        saveBack: 'false',
        name: slider?.name || '',
        link: slider?.link || '',
        image: null,
        previewImage: slider?.image ? `/storage/${slider.image}` : null,
        _method: dataId ? 'PUT' : 'POST',
    });

    // transformData
    transform((data: any) => ({
        ...data,
    }));

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (dataId) {
            post(route('cms.sliders.update', dataId), {
                forceFormData: true,
            });
        } else {
            post(route('cms.sliders.store'), {
                forceFormData: true,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputTextComponent
                    type="text"
                    label="Name"
                    name="name"
                    value={data.name}
                    handleOnChange={(value: string) => setData('name', value)}
                    errors={errors.name && errors.name}
                    helperText={errors.name && errors.name}
                />
                <InputTextComponent
                    type="text"
                    label="Link"
                    name="link"
                    value={data.link}
                    handleOnChange={(value: string) => setData('link', value)}
                    errors={errors.link && errors.link}
                    helperText={errors.link && errors.link}
                />
                <InputFileComponent
                    label="Featured Image"
                    name="image"
                    handleOnChange={(value: string) => setData('image', value)}
                    errors={errors.image && errors.image}
                    helperText={errors.image && errors.image}
                />
            </div>
            <div className="flex justify-end space-x-4">
                <ButtonComponent
                    buttonText="Save"
                    addonLeft={SaveIcon}
                    buttonType="submit"
                    isProcessing={processing}
                    onClick={() => setData('saveBack', 'true')}
                />
            </div>
        </form>
    );
};
