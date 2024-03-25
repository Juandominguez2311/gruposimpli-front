import React from "react";
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Typography,
    Box,
} from "@mui/material";

import styles from './ProductCard.module.css'

export default function ProductCard({ prod }) {
    const [hovered, setHovered] = React.useState(false);

    return (
        <div 
            className="flex items-center my-4 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 justify-center h-full"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Card className={styles.main_card}>
                <CardActionArea className={styles.card_action}>
                    <Box className={styles.cart_box}>
                        <img alt={prod.name} src={prod.img} className={styles.cart_img} />
                    </Box>
                    <CardContent>
                        <Typography gutterBottom variant="h6" sx={{ textAlign: "center", fontWeight: "bold" }}>
                            {prod.name.length > 20 ? prod.name.slice(0, 20) + '...' : prod.name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions style={{ display: "flex", justifyContent: "space-between", width: '100%' }}>
                    <Typography variant="body1" color="textSecondary" style={{ marginRight: 'auto' }}>
                        Precio desde:
                    </Typography>
                    <Typography variant="h6">
                        ${prod.price}
                    </Typography>
                </CardActions>
                {hovered && (
                        <Typography variant="body2" className={styles.hoverText}>
                            Ver detalles del modelo
                        </Typography>
                    )}
            </Card>
        </div>
    );
}
