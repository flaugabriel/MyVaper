class CreateUsuarios < ActiveRecord::Migration[6.0]
  def change
    create_table :usuarios do |t|
      t.string :apelido
      t.string :sobrenome
      t.integer :perfil
      t.integer :status

      t.timestamps
    end
  end
end
