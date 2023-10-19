'use client'

import Link from "next/link";
import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import './styles.css'

export default function Page() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState(0);
    const [color, setColor] = useState("");
    const [errors, setErrors] = useState<string[]>([]);

    const { push } = useRouter();
    const searchParams = useSearchParams();
    const sku = searchParams.get('sku');

    useEffect(() => {
        setName(searchParams.get('name') || '');
        setDescription(searchParams.get('description') || '');
        setColor(searchParams.get('color') || '');
        setType(searchParams.get('type') || '');
        const price = searchParams.get('price');
        setPrice(price ? parseFloat(price) : 0);

    }, [sku, searchParams]);

    const validate = () => {
        let newErrors = [];
        if(name === '' || name.length > 56) {
            newErrors.push('Name is a required field with length between 0 and 56 characters');
        }

        if(description === '' || description.length > 255) {
            newErrors.push('Description is a required field with length between 0 and 56 characters');
        }

        if(type === '') {
            newErrors.push('Type is a required field');
        }

        if(color === '') {
            newErrors.push('Color is a required field');
        }

        if(price === 0 || price > 2500) {
            newErrors.push('Price is limited to between $0 and $2500');
        }

        if(newErrors.length > 0) {
            setErrors(newErrors);
        }

        return newErrors.length;
    }
    const onSave = () => {
        setErrors([]);
        if(validate() === 0) {
            alert('Saving data to server');
            push('./product-list');
        }
    }

    return (
        <main className={"main-content"}>
            <h2 className={"product-list-title"}>Product Detail for {sku}</h2>
            <div className={"product-detail-form"}>
                <div className={"product-detail-field"}>
                    <div className={"product-detail-field-label"}>Name</div>
                    <input
                        className={"product-detail-field-input"}
                        type={"text"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className={"product-detail-field"}>
                    <div className={"product-detail-field-label"}>Description</div>
                    <textarea
                        className={"product-detail-field-input"}
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className={"product-detail-field"}>
                    <div className={"product-detail-field-label"}>Type</div>
                    <select
                        className={"product-detail-field-input"}
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value={''}>--Select Type--</option>
                        <option value={'pant'}>Pant</option>
                        <option value={'short'}>Short</option>
                        <option value={'dress'}>Dress</option>
                        <option value={'show'}>Show</option>
                    </select>
                </div>

                <div className={"product-detail-field"}>
                    <div className={"product-detail-field-label"}>Color</div>
                    <select
                        className={"product-detail-field-input"}
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    >
                        <option value={''}>--Select Color--</option>
                        <option value={'white'}>White</option>
                        <option value={'black'}>Black</option>
                        <option value={'blue'}>Blue</option>
                        <option value={'red'}>Red</option>
                        <option value={'pink'}>Pink</option>
                    </select>
                </div>

                <div className={"product-detail-field"}>
                    <div className={"product-detail-field-label"}>Price$</div>
                    <input
                        className={"product-detail-field-input"}
                        type={"number"}
                        min={"0.00"}
                        step={"0.01"}
                        max={"2500"}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        />
                </div>

                {errors.length > 0 &&
                    <div className={"errors-area"}>
                        {errors.map((e: any, idx) =>
                            <div key={idx} className={"error"}>{e}</div>
                        )}
                    </div>}

                <div className={"product-detail-action"}>
                    <button className={"product-save-button"} onClick={() => onSave()}>Save</button>
                </div>
            </div>

            <Link
                className={"back-prod-list"}
                href={{ pathname: 'product-list'}}>
                &#x2190; Back to Product List
            </Link>

        </main>)
}