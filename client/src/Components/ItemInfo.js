import React, { useEffect, useState } from 'react'
import { Button, Descriptions } from 'antd';

function ItemInfo(props) {
    
    const [Item, setItem] = useState({})

    useEffect(() => {

        setItem(props.detail)

    }, [props.detail])

    const buyItemhandler = () => {
    }


    return (
        <div>
            <Descriptions title="Item Info">
                <Descriptions.Item label="Price"> {Item.price}</Descriptions.Item>
                <Descriptions.Item label="Description"> {Item.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger"
                    onClick={buyItemhandler}
                >
                    Buy Item
                    </Button>
            </div>
        </div>
    )
}

export default ItemInfo