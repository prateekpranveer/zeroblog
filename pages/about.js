import { getLayoutProps } from "@/lib/layoutData";

export default function About (){
    return (
        <>About page</>
    )
}

export async function getStaticProps() {
    const layoutProps = await getLayoutProps();
    return {
        props: {
            ...layoutProps
        },
        revalidate: 60,
    }
}