import TokenEntity from '~/modules/auth/entities/token.entity'
import {
	BaseEntity,
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	Entity,
	OneToOne,
	PrimaryColumn,
	UpdateDateColumn
} from 'typeorm'
import { hash } from 'bcryptjs'
import { v4 as uuid } from 'uuid'

@Entity('users')
class UserEntity extends BaseEntity {
	@PrimaryColumn('varchar', { name: 'user_id' })
	id?: string

	@OneToOne(() => TokenEntity, token => token.user)
	token?: string

	@Column({ type: 'varchar', length: 150, unique: true, nullable: false })
	email: string

	@Column({ type: 'varchar', nullable: false, length: 150, select: false })
	password: string

	@Column({ type: 'varchar', nullable: false, length: 100, unique: true })
	name: string

	@CreateDateColumn({
		type: 'timestamp',
		nullable: true,
		default: () => 'CURRENT_TIMESTAMP(6)'
	})
	createdAt?: Date

	@UpdateDateColumn({
		type: 'timestamp',
		nullable: true,
		default: () => 'CURRENT_TIMESTAMP(6)',
		onUpdate: 'CURRENT_TIMESTAMP(6)'
	})
	updatedAt?: Date

	@BeforeInsert()
	@BeforeUpdate()
	private async hashPassword() {
		if (this.password) this.password = await hash(this.password, 10)
	}

	@BeforeInsert()
	private async createId() {
		if (!this.id) this.id = uuid()
	}
}

export type IUserEntity = Omit<UserEntity, keyof BaseEntity>

export { UserEntity }
