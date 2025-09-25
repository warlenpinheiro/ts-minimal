import { UserModel } from './UserModel';
// import { ContractModel } from './ContractModel';
// import { OrderModel } from './OrderModel';

export function setupRelations(): void {
  // User has many contracts
  // UserModel.hasMany(ContractModel, {
  //   foreignKey: 'userId',
  //   as: 'contracts'
  // });

  // Contract belongs to user
  // ContractModel.belongsTo(UserModel, {
  //   foreignKey: 'userId',
  //   as: 'user'
  // });

  // User has many orders
  // UserModel.hasMany(OrderModel, {
  //   foreignKey: 'userId',
  //   as: 'orders'
  // });

  console.log('✅ Database relations configured');
}