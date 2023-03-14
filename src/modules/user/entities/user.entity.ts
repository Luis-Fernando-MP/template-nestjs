import TokenEntity from '~/modules/auth/entities/token.entity'
import strategies from '~/modules/auth/types/strategies.enum'
import { v4 as uuid } from 'uuid'
import { hash, genSalt } from 'bcryptjs'
import { BeforeInsert, BeforeUpdate, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { BaseEntity, Column, Entity, PrimaryColumn, OneToOne } from 'typeorm'

const defaultUserPhoto =
	'https://res.cloudinary.com/dkbp71nof/image/upload/v1678743024/nest_test/users/xalxfg3rbhzufmm3aw0l.png'
export const defaultUserPhotoId = 'nest_test/users/xalxfg3rbhzufmm3aw0l.png'

@Entity('users')
class UserEntity extends BaseEntity {
	@PrimaryColumn('varchar', { name: 'user_id' })
	id?: string

	@OneToOne(() => TokenEntity, token => token.user)
	token?: string

	@Column({ type: 'varchar', length: 150, unique: true, nullable: false })
	email: string

	@Column({ type: 'varchar', nullable: false, length: 150, select: false })
	password?: string

	@Column({ type: 'varchar', nullable: false, length: 100, unique: true })
	name: string

	@Column({ type: 'enum', enum: strategies, default: strategies.JWT })
	provider?: string

	@Column('text', { default: defaultUserPhoto, nullable: true })
	photo?: string

	@Column('varchar', { default: defaultUserPhotoId, nullable: true })
	photo_id?: string

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
		if (this.password) {
			const salt = await genSalt(10)
			this.password = await hash(this.password, salt)
		}
	}

	@BeforeInsert()
	private async createId() {
		if (!this.id) this.id = uuid()
	}
}

export type IUserEntity = Omit<UserEntity, keyof BaseEntity>

export { UserEntity }
