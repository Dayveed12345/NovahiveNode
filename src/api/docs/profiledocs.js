/**
 * @swagger
 * tags:
 *   name: Profiles
 *   description: Profile management
 */

/**
 * @swagger
 * /profile:
 *   post:
 *     summary: Create a new profile
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - public_key
 *               - name
 *               - role
 *               - experience
 *               - skill
 *             properties:
 *               public_key:
 *                 type: string
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               picture:
 *                 type: string
 *               experience:
 *                 type: string
 *               skill:
 *                 type: string
 *     responses:
 *       201:
 *         description: Profile created successfully
 *       422:
 *         description: Unprocessable Entity
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /profile/{public_key}:
 *   patch:
 *     summary: Update an existing profile
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: public_key
 *         schema:
 *           type: string
 *         required: true
 *         description: Public key of the profile to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               picture:
 *                 type: string
 *               experience:
 *                 type: string
 *               skill:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get all profiles
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of profiles
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /profile/{public_key}:
 *   get:
 *     summary: Get a profile by public key
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: public_key
 *         schema:
 *           type: string
 *         required: true
 *         description: Public key of the profile to retrieve
 *     responses:
 *       200:
 *         description: Profile data
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Server Error
 */
