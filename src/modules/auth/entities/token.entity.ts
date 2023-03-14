import { v4 as uuid } from 'uuid'
import { UserEntity } from '~/modules/user/entities/user.entity'
import { BeforeInsert, OneToOne, JoinColumn } from 'typeorm'
import { BaseEntity, Entity, PrimaryColumn, Column } from 'typeorm'

@Entity('tokens')
class TokenEntity extends BaseEntity {
	@PrimaryColumn('varchar', { name: 'token_id' })
	id?: string

	@Column('text', { unique: true, nullable: false })
	token: string

	@OneToOne(() => UserEntity, user => user.token, {
		onDelete: 'CASCADE',
		nullable: false
	})
	@JoinColumn({ name: 'fk_user' })
	user?: UserEntity

	@BeforeInsert()
	private async createId() {
		if (!this.id) this.id = uuid()
	}
}

export type ITokenEntity = Omit<TokenEntity, keyof BaseEntity>

export default TokenEntity
