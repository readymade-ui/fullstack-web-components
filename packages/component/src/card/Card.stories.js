import { CardComponent } from "./Card";

export default {
    component: "in-card",
    title: "Components/Card",
    argTypes: {
        image: {
            control: {
                type: 'text'
            }
        },
        headline: {
            control: {
                type: 'text'
            }
        },
        content: {
            control: {
                type: 'text'
            }
        }
    }
}

const PrimaryTemplate = ({
    image, headline, content, link
}) => `
    <in-card style="max-width: 320px">
        <img 
            slot='header' 
            src='${image}'
        />

        <h4 slot='header'>${headline}</h4>
        
        <p slot='content'>${content}</p>
        
        <a href='#' slot='footer'>${link}</a>
    </in-card>
`;

export const ImageCard = PrimaryTemplate.bind({});

ImageCard.args = {
    image: 'https://www.denofgeek.com/wp-content/uploads/2021/04/jujutsu-kaisen-season-2-movie-prequel-details.jpeg?fit=1920%2C1080',
    headline: 'Food',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing eli...',
    link: 'Read'
};