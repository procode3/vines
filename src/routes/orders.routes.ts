import { Router } from 'express';
import { createOrder, getAllOrders, getOrder, updateOrder, deleteOrder,} from '../controllers';

const router  = Router();

router.
    get("/orders", getAllOrders)
    .get("/orders/:id", getOrder);
router.put("/orders/:id", updateOrder);
router.delete("/orders/:id", deleteOrder);    
router.post("/orders", createOrder);


module.exports = router;