import { useEffect, useState } from 'react'
import { getServices } from '@/service/authApi'
import type { IService } from '@/types/auth';

function Service() {
    const [services, setServices] = useState<IService[]>([]);
    useEffect(() => {
        async function loadServices() {
            try {
                const response = await getServices();
                setServices(response);
            } catch (error) {
                throw new Error("Something wrong with services");
                console.log("Something wrong with services page.");
            }
        }
        loadServices();
    }, [])
    return (
        <div>
            <h1 className="font-bold text-2xl mb-4">Services</h1>
            {services.length === 0 ? (
                <p>No services available.</p>
            ) : (
                <div className="grid gap-4">
                    {services.map((service, index) => (
                        <div key={service.id || index} className="border p-4 rounded">
                            <h2 className="font-semibold text-lg">{service.title}</h2>
                            <p>{service.shortDescription}</p>
                            <p>{service.description}</p>
                            <span className="font-bold">${service.price}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Service;