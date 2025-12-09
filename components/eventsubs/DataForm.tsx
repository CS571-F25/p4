import React, { useState } from 'react';

export default function DataForm({
    initialData,
    onChange,
}: {
    initialData: Record<string, any>;
    isFirst?: boolean;
    onChange?: (data: any) => void;
}) {
    const [data, setData] = useState(initialData);

    const handleChange = (key: string, value: any) => {
        const newData = { ...data, [key]: value };
        setData(newData);
        onChange?.(newData);
    };

    return (
        <div className="data-form">
            {Object.entries(data).map(([key, value]) => (
                <div key={key} className="data-form-item">
                    <label htmlFor={`data-form-input-${key}`}>
                        <strong>{key}:</strong>
                    </label>
                    <div>
                        {typeof value === 'object' ? (
                            <DataForm initialData={value} onChange={(newValue) => handleChange(key, newValue)} />
                        ) : (
                            <input
                                id={`data-form-input-${key}`}
                                type="text"
                                value={value}
                                onChange={(e) => handleChange(key, e.target.value)}
                                className="data-form-input"
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
