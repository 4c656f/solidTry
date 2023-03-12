import {PrismaClient} from '@prisma/client'
import { faker } from '@faker-js/faker';
import {Post} from '@prisma/client'
import slugify from 'slugify';

const prisma = new PrismaClient()

const post:Pick<Post , 'title' | 'link' | 'content' | 'authorId'>[] = Array.from({length: 50}).map(value => {

    const title = faker.lorem.words( 6)

    return {
        title: title,
        link: slugify(title),
        content: `<h1>${faker.lorem.sentence(5)}</h1><p>${faker.lorem.paragraph(10)}</p>`,
        authorId: 1
    }
})


async function main() {
    console.log(post)
    const posts = await prisma.post.createMany({
        data:post
    })
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})
