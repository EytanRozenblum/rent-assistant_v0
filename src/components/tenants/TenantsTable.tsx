
import React from 'react';
import { Tenant } from '@/types';
import StatusBadge from '../shared/StatusBadge';

interface TenantsTableProps {
  tenants: Tenant[];
}

const TenantsTable = ({ tenants }: TenantsTableProps) => {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Unit</th>
            <th>Lease End</th>
            <th>Rent</th>
            <th>Status</th>
            <th>Rent Status</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant) => (
            <tr key={tenant.id}>
              <td>
                <div>
                  <div className="font-medium">{tenant.name}</div>
                  <div className="text-sm text-gray-500">{tenant.email}</div>
                </div>
              </td>
              <td>{tenant.unit}</td>
              <td>{tenant.leaseEnd}</td>
              <td>${tenant.rentAmount.toLocaleString()}</td>
              <td>
                <StatusBadge status={tenant.status as any} />
              </td>
              <td>
                <StatusBadge status={tenant.rentStatus as any} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TenantsTable;
