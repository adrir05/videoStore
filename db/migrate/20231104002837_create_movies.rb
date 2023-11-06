class CreateMovies < ActiveRecord::Migration[7.1]
  def change
    create_table :movies do |t|

      t.string :name
      t.integer :like_counter, default: 0, null: true
      t.timestamps
    end
  end
end
